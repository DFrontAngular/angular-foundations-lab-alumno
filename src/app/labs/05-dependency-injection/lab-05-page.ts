import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

import {
  AVAILABLE_CURRENCIES,
  type CurrencyCode,
  CurrencyPreferences,
} from './currency-preferences';

@Component({
  imports: [LabHeader],
  providers: [
    CurrencyPreferences,
    { provide: AVAILABLE_CURRENCIES, useValue: ['EUR', 'USD', 'GBP'] as const },
  ],
  templateUrl: './lab-05-page.html',
  styleUrl: './lab-05-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab05Page {
  readonly currencies = inject(AVAILABLE_CURRENCIES);
  readonly preferences = inject(CurrencyPreferences);
  readonly price = 109.9;

  readonly formattedPrice = computed(() =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: this.preferences.currency(),
    }).format(this.price),
  );

  onCurrencyChange(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement && this.#isCurrency(target.value)) {
      this.preferences.setCurrency(target.value);
    }
  }

  #isCurrency(value: string): value is CurrencyCode {
    return this.currencies.includes(value as CurrencyCode);
  }
}
