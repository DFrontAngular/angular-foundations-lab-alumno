import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { DEMO_PRODUCTS } from '@shared/data/catalog.data';
import { LabHeader } from '@shared/ui/lab-header/lab-header';

import { ProductCard } from './product-card';

@Component({
  imports: [LabHeader, ProductCard],
  templateUrl: './lab-04-page.html',
  styleUrl: './lab-04-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab04Page {
  readonly products = DEMO_PRODUCTS;
  readonly #favoriteIds = signal<ReadonlySet<string>>(new Set());

  readonly favoriteCount = computed(() => this.#favoriteIds().size);

  isFavorite(productId: string): boolean {
    return this.#favoriteIds().has(productId);
  }

  toggleFavorite(productId: string): void {
    // TODO: crea un Set nuevo, añade o elimina el ID y actualiza el signal.
    void productId;
  }
}
