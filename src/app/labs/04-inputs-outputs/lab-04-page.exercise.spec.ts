import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Lab04Page from './lab-04-page';

describe('Lab 04 · inputs and outputs', () => {
  it('toggles a favorite through the child output', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab04Page],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab04Page);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const favoriteButton = host.querySelector(
      '[aria-label="Añadir a favoritos Teclado mecánico TKL"]',
    ) as HTMLButtonElement;

    favoriteButton.click();
    await fixture.whenStable();
    expect(host.querySelector('[data-testid="favorite-count"]')?.textContent).toContain('1 favoritos');
    expect(favoriteButton.getAttribute('aria-pressed')).toBe('true');

    favoriteButton.click();
    await fixture.whenStable();
    expect(host.querySelector('[data-testid="favorite-count"]')?.textContent).toContain('0 favoritos');
    expect(favoriteButton.getAttribute('aria-pressed')).toBe('false');
  });
});
