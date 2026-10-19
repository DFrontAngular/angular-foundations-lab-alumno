export const categories = [
  {
    id: 'hardware',
    name: 'Hardware',
    subcategories: [
      { id: 'keyboards', name: 'Teclados' },
      { id: 'mice', name: 'Ratones' },
      { id: 'monitors', name: 'Monitores' },
    ],
  },
  {
    id: 'software',
    name: 'Software',
    subcategories: [
      { id: 'development', name: 'Desarrollo' },
      { id: 'design', name: 'Diseño' },
      { id: 'productivity', name: 'Productividad' },
    ],
  },
  {
    id: 'accessories',
    name: 'Accesorios',
    subcategories: [
      { id: 'stands', name: 'Soportes' },
      { id: 'cables', name: 'Cables' },
      { id: 'bags', name: 'Transporte' },
    ],
  },
];

const seed = [
  ['Teclado mecánico TKL', 'hardware', 'keyboards', 'physical', 109.9, 89.9, 14],
  ['Ratón ergonómico', 'hardware', 'mice', 'physical', 69.9, 0, 0],
  ['Monitor 27 pulgadas', 'hardware', 'monitors', 'physical', 289, 249, 8],
  ['Licencia IDE Pro', 'software', 'development', 'digital', 149, 119, 0],
  ['Suite de diseño', 'software', 'design', 'digital', 199, 0, 0],
  ['Gestor de tareas', 'software', 'productivity', 'digital', 59, 39, 0],
  ['Soporte de portátil', 'accessories', 'stands', 'physical', 42.5, 0, 6],
  ['Cable USB-C trenzado', 'accessories', 'cables', 'physical', 19.9, 14.9, 24],
  ['Mochila para portátil', 'accessories', 'bags', 'physical', 74.9, 0, 11],
  ['Teclado compacto silencioso', 'hardware', 'keyboards', 'physical', 79.9, 0, 5],
  ['Ratón de viaje', 'hardware', 'mice', 'physical', 29.9, 0, 18],
  ['Monitor portátil', 'hardware', 'monitors', 'physical', 219, 189, 3],
];

export function createSeedProducts() {
  return seed.map(([name, categoryId, subcategoryId, kind, basePrice, salePrice, stock], index) => ({
    id: `p-${100 + index}`,
    name,
    description: `Descripción de ${String(name).toLocaleLowerCase('es')}.`,
    categoryId,
    subcategoryId,
    kind,
    basePrice,
    salePrice,
    stock,
    status: Number(stock) > 0 || kind === 'digital' ? 'active' : 'out-of-stock',
  }));
}
