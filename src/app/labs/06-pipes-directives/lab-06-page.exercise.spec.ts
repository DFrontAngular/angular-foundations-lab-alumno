import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Lab06Page from './lab-06-page';

describe('Lab 06 · pipes and directives', () => {
  it('maps stock labels and decorates matching rows', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab06Page],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab06Page);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('[data-testid="stock-p-100"]')?.textContent?.trim()).toBe('Disponible');
    expect(host.querySelector('[data-testid="stock-p-101"]')?.textContent?.trim()).toBe('Agotado');
    expect(host.querySelector('[data-testid="stock-p-103"]')?.textContent?.trim()).toBe(
      'Disponible',
    );

    const highlighted = host.querySelectorAll('[data-testid="product-row"].search-match');
    expect(highlighted).toHaveLength(1);
    expect(highlighted[0]?.textContent).toContain('Teclado');
  });
});
