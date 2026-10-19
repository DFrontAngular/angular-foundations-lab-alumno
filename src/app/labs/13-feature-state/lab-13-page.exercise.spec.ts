import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Lab13Page from './lab-13-page';
import { ProductsStore } from './products.store';

describe('Lab 13 · feature state', () => {
  it('filters and toggles favorites through the store API', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab13Page],
      providers: [provideRouter([]), ProductsStore],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab13Page);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const favorite = host.querySelector(
      '[aria-label="Cambiar favorito Teclado mecánico TKL"]',
    ) as HTMLButtonElement;

    favorite.click();
    await fixture.whenStable();
    expect(host.querySelector('[data-testid="store-favorite-count"]')?.textContent).toContain('1');
    expect(favorite.getAttribute('aria-pressed')).toBe('true');

    const query = host.querySelector('#store-query') as HTMLInputElement;
    query.value = 'licencia';
    query.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(host.querySelectorAll('[data-testid="store-product"]')).toHaveLength(1);
    expect(host.textContent).toContain('Licencia IDE Pro');
  });
});
