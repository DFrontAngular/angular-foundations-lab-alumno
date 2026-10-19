import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { ProductsResponse } from '@shared/domain/product.models';

import Lab10Page from './lab-10-page';

const response: ProductsResponse = {
  items: [
    {
      id: 'remote-1',
      name: 'Teclado remoto',
      description: 'Producto de prueba',
      categoryId: 'hardware',
      subcategoryId: 'keyboards',
      kind: 'physical',
      basePrice: 99,
      salePrice: 0,
      stock: 3,
      status: 'active',
    },
  ],
  total: 1,
  page: 1,
  limit: 12,
};

describe('Lab 10 · httpResource', () => {
  it('renders loading-safe remote results and reacts to filters', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab10Page],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab10Page);
    TestBed.tick();
    const http = TestBed.inject(HttpTestingController);
    const initial = http.expectOne((request) => request.url === '/api/products');
    initial.flush(response);
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('[data-testid="remote-product"]')).toHaveLength(1);
    expect(host.textContent).toContain('Teclado remoto');

    const search = host.querySelector('#remote-search') as HTMLInputElement;
    search.value = 'ratón';
    search.dispatchEvent(new Event('input'));
    TestBed.tick();
    const filtered = http.expectOne(
      (request) => request.url === '/api/products' && request.params.get('search') === 'ratón',
    );
    filtered.flush({ ...response, items: [], total: 0 });
    await fixture.whenStable();

    expect(host.querySelector('[data-testid="remote-empty"]')).not.toBeNull();
    http.verify();
  });
});
