import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { Product } from '@shared/domain/product.models';

@Injectable()
export class ProductsApi {
  readonly #http = inject(HttpClient);

  create(name: string): Observable<Product> {
    return this.#http.post<Product>('/api/products', {
      name,
      description: 'Creado desde el laboratorio de mutaciones',
      categoryId: 'hardware',
      subcategoryId: 'keyboards',
      kind: 'physical',
      basePrice: 49.9,
      salePrice: 0,
      stock: 1,
    });
  }

  remove(productId: string): Observable<void> {
    return this.#http.delete<void>(`/api/products/${productId}`);
  }
}
