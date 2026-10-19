import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

const MIN_QUANTITY = 1;

@Component({
  imports: [LabHeader],
  templateUrl: './lab-01-page.html',
  styleUrl: './lab-01-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab01Page {
  readonly quantity = signal(MIN_QUANTITY);
  readonly canDecrease = computed(() => this.quantity() > MIN_QUANTITY);

  increase(): void {
    this.quantity.update((value) => value + 1);
  }

  decrease(): void {
    // TODO: evita que la cantidad baje del mínimo permitido.
    this.quantity.update((value) => value - 1);
  }

  reset(): void {
    // TODO: restablece el estado sin tocar el DOM.
  }
}
