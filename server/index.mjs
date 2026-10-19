import { randomUUID } from 'node:crypto';
import http from 'node:http';

import { categories, createSeedProducts } from './data.mjs';

const port = Number(process.env.PORT ?? 3000);
const minDelay = Number(process.env.API_DELAY_MIN_MS ?? 120);
const maxDelay = Number(process.env.API_DELAY_MAX_MS ?? 450);
let products = createSeedProducts();

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  });
  response.end(body === undefined ? undefined : JSON.stringify(body));
}

function sendEmpty(response, status = 204) {
  response.writeHead(status, {
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  });
  response.end();
}

function delay() {
  const duration = Math.floor(minDelay + Math.random() * Math.max(0, maxDelay - minDelay));
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 1_000_000) {
      throw new Error('PAYLOAD_TOO_LARGE');
    }
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateProductDraft(value) {
  if (!isRecord(value)) return 'El payload debe ser un objeto.';
  if (typeof value.name !== 'string' || value.name.trim().length < 3) {
    return 'El nombre debe tener al menos 3 caracteres.';
  }
  if (typeof value.categoryId !== 'string' || typeof value.subcategoryId !== 'string') {
    return 'Categoría y subcategoría son obligatorias.';
  }
  const category = categories.find((item) => item.id === value.categoryId);
  if (!category?.subcategories.some((item) => item.id === value.subcategoryId)) {
    return 'La subcategoría no pertenece a la categoría.';
  }
  if (value.kind !== 'physical' && value.kind !== 'digital') {
    return 'El tipo debe ser physical o digital.';
  }
  if (typeof value.basePrice !== 'number' || value.basePrice <= 0) {
    return 'El precio base debe ser mayor que cero.';
  }
  if (typeof value.salePrice !== 'number' || value.salePrice < 0) {
    return 'El precio promocional no puede ser negativo.';
  }
  if (value.salePrice > 0 && value.salePrice >= value.basePrice) {
    return 'El precio promocional debe ser inferior al precio base.';
  }
  if (value.kind === 'physical' && (typeof value.stock !== 'number' || value.stock < 1)) {
    return 'Un producto físico necesita stock.';
  }
  return null;
}

function normalizeProduct(value, id) {
  const stock = value.kind === 'digital' ? 0 : Math.trunc(value.stock);
  return {
    id,
    name: value.name.trim(),
    description: typeof value.description === 'string' ? value.description.trim() : '',
    categoryId: value.categoryId,
    subcategoryId: value.subcategoryId,
    kind: value.kind,
    basePrice: value.basePrice,
    salePrice: value.salePrice,
    stock,
    status: stock > 0 || value.kind === 'digital' ? 'active' : 'out-of-stock',
  };
}

function getProductId(pathname) {
  const match = pathname.match(/^\/api\/products\/([^/]+)$/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);

  if (request.method === 'OPTIONS') {
    sendEmpty(response);
    return;
  }

  await delay();

  if (url.pathname === '/api/health' && request.method === 'GET') {
    sendJson(response, 200, { status: 'ok', products: products.length });
    return;
  }

  if (url.pathname === '/api/categories' && request.method === 'GET') {
    sendJson(response, 200, { items: categories });
    return;
  }

  if (url.pathname === '/api/suggestions' && request.method === 'GET') {
    const query = (url.searchParams.get('q') ?? '').trim().toLocaleLowerCase('es');
    const items = query.length < 2
      ? []
      : products
          .filter((product) => product.name.toLocaleLowerCase('es').includes(query))
          .map((product) => product.name)
          .slice(0, 8);
    sendJson(response, 200, { items });
    return;
  }

  if (url.pathname === '/api/reset' && request.method === 'POST') {
    products = createSeedProducts();
    sendJson(response, 200, { items: products, total: products.length });
    return;
  }

  if (url.pathname === '/api/products' && request.method === 'GET') {
    const search = (url.searchParams.get('search') ?? '').trim().toLocaleLowerCase('es');
    const category = url.searchParams.get('category') ?? '';
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
    const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') ?? 12)));
    const sort = url.searchParams.get('sort') ?? 'name';

    if (search === 'error') {
      sendJson(response, 500, { message: 'Error simulado para practicar recuperación.' });
      return;
    }

    const filtered = products.filter((product) => {
      const matchesSearch = `${product.name} ${product.description}`
        .toLocaleLowerCase('es')
        .includes(search);
      const matchesCategory = !category || product.categoryId === category;
      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered].sort((left, right) => {
      if (sort === 'price') return left.basePrice - right.basePrice;
      if (sort === '-price') return right.basePrice - left.basePrice;
      return left.name.localeCompare(right.name, 'es');
    });
    const start = (page - 1) * limit;
    sendJson(response, 200, {
      items: sorted.slice(start, start + limit),
      total: sorted.length,
      page,
      limit,
    });
    return;
  }

  if (url.pathname === '/api/products' && request.method === 'POST') {
    try {
      const body = await readJson(request);
      const validationError = validateProductDraft(body);
      if (validationError) {
        sendJson(response, 400, { message: validationError });
        return;
      }
      const product = normalizeProduct(body, randomUUID());
      products = [product, ...products];
      sendJson(response, 201, product);
    } catch (error) {
      sendJson(response, error instanceof SyntaxError ? 400 : 413, {
        message: error instanceof SyntaxError ? 'JSON inválido.' : 'Payload demasiado grande.',
      });
    }
    return;
  }

  const productId = getProductId(url.pathname);
  if (productId && request.method === 'GET') {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      sendJson(response, 404, { message: 'Producto no encontrado.' });
      return;
    }
    sendJson(response, 200, product);
    return;
  }

  if (productId && request.method === 'PATCH') {
    const current = products.find((item) => item.id === productId);
    if (!current) {
      sendJson(response, 404, { message: 'Producto no encontrado.' });
      return;
    }
    try {
      const body = await readJson(request);
      const merged = { ...current, ...body };
      const validationError = validateProductDraft(merged);
      if (validationError) {
        sendJson(response, 400, { message: validationError });
        return;
      }
      const updated = normalizeProduct(merged, productId);
      products = products.map((item) => (item.id === productId ? updated : item));
      sendJson(response, 200, updated);
    } catch {
      sendJson(response, 400, { message: 'No se pudo interpretar el payload.' });
    }
    return;
  }

  if (productId && request.method === 'DELETE') {
    const exists = products.some((item) => item.id === productId);
    if (!exists) {
      sendJson(response, 404, { message: 'Producto no encontrado.' });
      return;
    }
    products = products.filter((item) => item.id !== productId);
    sendEmpty(response);
    return;
  }

  sendJson(response, 404, { message: 'Endpoint no encontrado.' });
});

server.listen(port, () => {
  console.log(`Angular Foundations API disponible en http://localhost:${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
