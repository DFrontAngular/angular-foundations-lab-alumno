import { CATEGORIES } from '@shared/data/catalog.data';
import type { ProductDraft, Subcategory } from '@shared/domain/product.models';

export type ProductRuleError = 'invalidSubcategory' | 'invalidSalePrice' | 'physicalStockRequired';

export const EMPTY_PRODUCT_DRAFT: ProductDraft = {
  name: '',
  description: '',
  categoryId: '',
  subcategoryId: '',
  kind: 'physical',
  basePrice: 0,
  salePrice: 0,
  stock: 0,
};

export function subcategoriesFor(categoryId: string): readonly Subcategory[] {
  return CATEGORIES.find((category) => category.id === categoryId)?.subcategories ?? [];
}

export function isValidSubcategory(categoryId: string, subcategoryId: string): boolean {
  return subcategoriesFor(categoryId).some((subcategory) => subcategory.id === subcategoryId);
}

export function validateProductRules(draft: ProductDraft): ReadonlySet<ProductRuleError> {
  const errors = new Set<ProductRuleError>();

  if (draft.categoryId && draft.subcategoryId && !isValidSubcategory(draft.categoryId, draft.subcategoryId)) {
    errors.add('invalidSubcategory');
  }

  if (draft.salePrice > 0 && draft.salePrice >= draft.basePrice) {
    errors.add('invalidSalePrice');
  }

  if (draft.kind === 'physical' && draft.stock < 1) {
    errors.add('physicalStockRequired');
  }

  return errors;
}

export function normalizeProductDraft(draft: ProductDraft): ProductDraft {
  return {
    ...draft,
    name: draft.name.trim(),
    description: draft.description.trim(),
    stock: draft.kind === 'digital' ? 0 : draft.stock,
  };
}
