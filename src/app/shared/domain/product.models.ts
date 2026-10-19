export type ProductStatus = 'active' | 'out-of-stock' | 'archived';
export type ProductKind = 'physical' | 'digital';

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly categoryId: string;
  readonly subcategoryId: string;
  readonly kind: ProductKind;
  readonly basePrice: number;
  readonly salePrice: number;
  readonly stock: number;
  readonly status: ProductStatus;
}

export interface ProductDraft {
  name: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  kind: ProductKind;
  basePrice: number;
  salePrice: number;
  stock: number;
}

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly subcategories: readonly Subcategory[];
}

export interface Subcategory {
  readonly id: string;
  readonly name: string;
}

export interface ProductsResponse {
  readonly items: readonly Product[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}
