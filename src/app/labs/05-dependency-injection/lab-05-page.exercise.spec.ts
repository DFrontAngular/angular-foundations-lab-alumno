import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Lab05Page from './lab-05-page';

describe('Lab 05 · dependency injection', () => {
  it('updates the injected preference from the UI', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab05Page],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab05Page);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const select = host.querySelector('#currency') as HTMLSelectElement;

    expect(host.querySelector('[data-testid="currency-code"]')?.textContent?.trim()).toBe('EUR');
    select.value = 'USD';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();

    expect(host.querySelector('[data-testid="currency-code"]')?.textContent?.trim()).toBe('USD');
    expect(host.querySelector('[data-testid="formatted-price"]')?.textContent).toContain('$');
  });
});
