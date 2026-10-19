import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Lab02Page from './lab-02-page';

describe('Lab 02 · cart signals', () => {
  it('derives totals and updates quantities immutably from the UI', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab02Page],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab02Page);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('[data-testid="subtotal"]')?.textContent?.trim()).toBe('169.80 €');
    expect(host.querySelector('[data-testid="tax"]')?.textContent?.trim()).toBe('35.66 €');
    expect(host.querySelector('[data-testid="total"]')?.textContent?.trim()).toBe('205.46 €');

    const increaseKeyboard = host.querySelector(
      '[aria-label="Aumentar Teclado mecánico"]',
    ) as HTMLButtonElement;
    increaseKeyboard.click();
    await fixture.whenStable();

    expect(host.querySelector('[data-testid="quantity-keyboard"]')?.textContent?.trim()).toBe('2');
    expect(host.querySelector('[data-testid="subtotal"]')?.textContent?.trim()).toBe('259.70 €');

    const reduceKeyboard = host.querySelector(
      '[aria-label="Reducir Teclado mecánico"]',
    ) as HTMLButtonElement;
    reduceKeyboard.click();
    reduceKeyboard.click();
    reduceKeyboard.click();
    await fixture.whenStable();

    expect(host.querySelector('[data-testid="quantity-keyboard"]')?.textContent?.trim()).toBe('0');
  });
});
