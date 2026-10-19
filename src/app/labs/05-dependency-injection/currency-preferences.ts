import { Injectable, InjectionToken, signal } from '@angular/core';

export type CurrencyCode = 'EUR' | 'USD' | 'GBP';

export const AVAILABLE_CURRENCIES = new InjectionToken<readonly CurrencyCode[]>(
  'AVAILABLE_CURRENCIES',
);

@Injectable()
export class CurrencyPreferences {
  readonly #currency = signal<CurrencyCode>('EUR');
  readonly currency = this.#currency.asReadonly();

  setCurrency(currency: CurrencyCode): void {
    // TODO: actualiza la preferencia encapsulada.
    void currency;
  }
}
