import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CATEGORIES, DEMO_PRODUCTS } from '@shared/data/catalog.data';
import { LabHeader } from '@shared/ui/lab-header/lab-header';

@Component({
  imports: [LabHeader],
  templateUrl: './lab-08-page.html',
  styleUrl: './lab-08-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab08Page {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  readonly categories = CATEGORIES;
  readonly search = signal(this.#route.snapshot.queryParamMap.get('search') ?? '');
  readonly category = signal(this.#route.snapshot.queryParamMap.get('category') ?? '');

  readonly visibleProducts = computed(() => {
    const search = this.search().trim().toLocaleLowerCase('es');
    const category = this.category();

    return DEMO_PRODUCTS.filter(
      (product) =>
        (!category || product.categoryId === category) &&
        product.name.toLocaleLowerCase('es').includes(search),
    );
  });

  onSearch(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.search.set(target.value);
    }
  }

  onCategory(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.category.set(target.value);
    }
  }

  applyFilters(): void {
    // TODO: navega sobre la misma ruta con query params y elimina valores vacíos.
  }
}
