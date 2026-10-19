import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { Product, ProductsResponse } from '@shared/domain/product.models';

import Lab11Page from './lab-11-page';

const product: Product = {
  id: 'p-test',
  name: 'Producto inicial',
  description: 'Prueba',
  categoryId: 'hardware',
  subcategoryId: 'keyboards',
  kind: 'physical',
  basePrice: 49.9,
  salePrice: 0,
  stock: 1,
  status: 'active',
};

const list = (items: readonly Product[]): ProductsResponse => ({
  items,
  total: items.length,
  page: 1,
  limit: 6,
});

describe('Lab 11 · mutations', () => {
  it('creates a product and reloads the list', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab11Page],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab11Page);
    TestBed.tick();
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('/api/products?limit=6').flush(list([product]));
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const name = host.querySelector('#mutation-name') as HTMLInputElement;
    name.value = 'Producto nuevo';
    name.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    (host.querySelector('form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );

    const create = http.expectOne('/api/products');
    expect(create.request.method).toBe('POST');
    create.flush({ ...product, id: 'p-created', name: 'Producto nuevo' });
    await Promise.resolve();
    http.expectOne('/api/products?limit=6').flush(
      list([product, { ...product, id: 'p-created', name: 'Producto nuevo' }]),
    );
    await fixture.whenStable();

    expect(host.textContent).toContain('Producto creado');
    expect(host.querySelectorAll('[data-testid="mutable-product"]')).toHaveLength(2);
    http.verify();
  });
});
