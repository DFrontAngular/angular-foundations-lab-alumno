import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

import { ProductsStore } from './products.store';

@Component({
  imports: [LabHeader],
  templateUrl: './lab-13-page.html',
  styleUrl: './lab-13-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab13Page {
  readonly store = inject(ProductsStore);

  onQuery(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.store.setQuery(target.value);
    }
  }
}
