import { computed, Injectable, signal } from '@angular/core';

import { DEMO_PRODUCTS } from '@shared/data/catalog.data';

@Injectable()
export class ProductsStore {
  readonly #query = signal('');
  readonly #favoriteIds = signal<ReadonlySet<string>>(new Set());

  readonly query = this.#query.asReadonly();
  readonly favorites = this.#favoriteIds.asReadonly();
  readonly favoriteCount = computed(() => this.#favoriteIds().size);
  readonly visibleProducts = computed(() => {
    const query = this.#query().trim().toLocaleLowerCase('es');
    return DEMO_PRODUCTS.filter((product) => product.name.toLocaleLowerCase('es').includes(query));
  });

  setQuery(query: string): void {
    this.#query.set(query);
  }

  isFavorite(productId: string): boolean {
    return this.#favoriteIds().has(productId);
  }

  toggleFavorite(productId: string): void {
    // TODO: encapsula la mutación con una nueva instancia de Set.
    void productId;
  }
}
