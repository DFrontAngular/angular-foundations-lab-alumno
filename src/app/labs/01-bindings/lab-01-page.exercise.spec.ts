import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Lab01Page from './lab-01-page';

describe('Lab 01 · quantity selector', () => {
  it('increments, respects the minimum and resets from the UI', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab01Page],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab01Page);
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const increase = host.querySelector('[aria-label="Aumentar cantidad"]') as HTMLButtonElement;
    const decrease = host.querySelector('[aria-label="Reducir cantidad"]') as HTMLButtonElement;
    const reset = [...host.querySelectorAll('button')].find((button) =>
      button.textContent?.includes('Restablecer'),
    ) as HTMLButtonElement;
    const value = host.querySelector('[data-testid="quantity"]') as HTMLOutputElement;

    expect(value.textContent?.trim()).toBe('1');
    expect(decrease.disabled).toBe(true);

    increase.click();
    increase.click();
    await fixture.whenStable();
    expect(value.textContent?.trim()).toBe('3');

    decrease.click();
    decrease.click();
    await fixture.whenStable();
    expect(value.textContent?.trim()).toBe('1');
    expect(decrease.disabled).toBe(true);

    reset.click();
    await fixture.whenStable();
    expect(value.textContent?.trim()).toBe('1');
  });
});
