import type { Category, Product } from '@shared/domain/product.models';

export const CATEGORIES: readonly Category[] = [
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
] as const;

export const DEMO_PRODUCTS: readonly Product[] = [
  {
    id: 'p-100',
    name: 'Teclado mecánico TKL',
    description: 'Teclado compacto con switches intercambiables.',
    categoryId: 'hardware',
    subcategoryId: 'keyboards',
    kind: 'physical',
    basePrice: 109.9,
    salePrice: 89.9,
    stock: 14,
    status: 'active',
  },
  {
    id: 'p-101',
    name: 'Ratón ergonómico',
    description: 'Ratón inalámbrico vertical para jornadas largas.',
    categoryId: 'hardware',
    subcategoryId: 'mice',
    kind: 'physical',
    basePrice: 69.9,
    salePrice: 0,
    stock: 0,
    status: 'out-of-stock',
  },
  {
    id: 'p-102',
    name: 'Licencia IDE Pro',
    description: 'Suscripción anual para herramientas de desarrollo.',
    categoryId: 'software',
    subcategoryId: 'development',
    kind: 'digital',
    basePrice: 149,
    salePrice: 119,
    stock: 0,
    status: 'active',
  },
  {
    id: 'p-103',
    name: 'Soporte de portátil',
    description: 'Soporte de aluminio regulable.',
    categoryId: 'accessories',
    subcategoryId: 'stands',
    kind: 'physical',
    basePrice: 42.5,
    salePrice: 0,
    stock: 6,
    status: 'archived',
  },
] as const;
