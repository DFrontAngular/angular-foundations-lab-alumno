import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Lab03Page from './lab-03-page';

describe('Lab 03 · control flow', () => {
  it('filters by status and renders the empty state', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab03Page],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab03Page);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const status = host.querySelector('#status-filter') as HTMLSelectElement;
    const search = host.querySelector('#catalog-search') as HTMLInputElement;

    status.value = 'out-of-stock';
    status.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    expect(host.querySelectorAll('[data-testid="product-card"]')).toHaveLength(1);
    expect(host.textContent).toContain('Ratón ergonómico');

    search.value = 'producto inexistente';
    search.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(host.querySelector('[data-testid="empty-state"]')).not.toBeNull();
  });
});
