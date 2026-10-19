import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { DEMO_PRODUCTS } from '@shared/data/catalog.data';
import { LabHeader } from '@shared/ui/lab-header/lab-header';

import { HighlightMatchDirective } from './highlight-match.directive';
import { StockLabelPipe } from './stock-label.pipe';

@Component({
  imports: [LabHeader, HighlightMatchDirective, StockLabelPipe],
  templateUrl: './lab-06-page.html',
  styleUrl: './lab-06-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab06Page {
  readonly products = DEMO_PRODUCTS;
  readonly search = signal('teclado');

  onSearch(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.search.set(target.value);
    }
  }
}
