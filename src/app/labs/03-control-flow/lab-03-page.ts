import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { DEMO_PRODUCTS } from '@shared/data/catalog.data';
import type { ProductStatus } from '@shared/domain/product.models';
import { LabHeader } from '@shared/ui/lab-header/lab-header';

type StatusFilter = 'all' | ProductStatus;

@Component({
  imports: [LabHeader],
  templateUrl: './lab-03-page.html',
  styleUrl: './lab-03-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab03Page {
  readonly products = DEMO_PRODUCTS;
  readonly search = signal('');
  readonly status = signal<StatusFilter>('all');

  readonly visibleProducts = computed(() => {
    // TODO: aplica búsqueda y estado sin mutar el catálogo.
    return this.products;
  });

  onSearch(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.search.set(target.value);
    }
  }

  onStatusChange(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement && this.#isStatusFilter(target.value)) {
      this.status.set(target.value);
    }
  }

  #isStatusFilter(value: string): value is StatusFilter {
    return ['all', 'active', 'out-of-stock', 'archived'].includes(value);
  }
}
