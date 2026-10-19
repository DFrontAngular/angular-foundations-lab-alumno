import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import test from 'node:test';

const port = 31_000 + (process.pid % 1_000);
const baseUrl = `http://127.0.0.1:${port}`;

async function waitForServer(child) {
  const timeout = setTimeout(() => {
    child.kill('SIGTERM');
  }, 5_000);

  try {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      try {
        const response = await fetch(`${baseUrl}/api/health`);
        if (response.ok) return;
      } catch {
        // El proceso puede necesitar unos milisegundos para escuchar el puerto.
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw new Error('La API no quedó disponible dentro del tiempo esperado.');
  } finally {
    clearTimeout(timeout);
  }
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([
    once(child, 'exit'),
    new Promise((resolve) => setTimeout(resolve, 1_000)),
  ]);
}

test('the local API supports its core learning flow', async () => {
  const child = spawn(process.execPath, ['server/index.mjs'], {
    env: {
      ...process.env,
      PORT: String(port),
      API_DELAY_MIN_MS: '0',
      API_DELAY_MAX_MS: '0',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  try {
    await waitForServer(child);

    const healthResponse = await fetch(`${baseUrl}/api/health`);
    assert.equal(healthResponse.status, 200);
    const health = await healthResponse.json();
    assert.equal(health.status, 'ok');
    assert.ok(health.products > 0);

    const listResponse = await fetch(`${baseUrl}/api/products?search=teclado&limit=2`);
    assert.equal(listResponse.status, 200);
    const list = await listResponse.json();
    assert.equal(list.items.length, 2);
    assert.equal(list.total, 2);

    const createResponse = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Monitor de integración',
        description: 'Creado desde el smoke test',
        categoryId: 'hardware',
        subcategoryId: 'monitors',
        kind: 'physical',
        basePrice: 250,
        salePrice: 220,
        stock: 3,
      }),
    });
    assert.equal(createResponse.status, 201);
    const created = await createResponse.json();
    assert.equal(created.name, 'Monitor de integración');

    const detailResponse = await fetch(`${baseUrl}/api/products/${created.id}`);
    assert.equal(detailResponse.status, 200);

    const deleteResponse = await fetch(`${baseUrl}/api/products/${created.id}`, {
      method: 'DELETE',
    });
    assert.equal(deleteResponse.status, 204);

    const invalidResponse = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'x' }),
    });
    assert.equal(invalidResponse.status, 400);
  } finally {
    await stopServer(child);
  }
});
