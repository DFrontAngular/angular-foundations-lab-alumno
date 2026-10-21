import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { CATEGORIES } from '@shared/data/catalog.data';
import { LabHeader } from '@shared/ui/lab-header/lab-header';

@Component({
  imports: [LabHeader],
  templateUrl: './lab-10-page.html',
  styleUrl: './lab-10-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab10Page {
  readonly categories = CATEGORIES;
  readonly search = signal('');
  readonly category = signal('');

  // TODO: crea un httpResource que dependa de search y category.

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
}
