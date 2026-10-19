import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Product } from '@shared/domain/product.models';

@Component({
  template: `
    <section class="card stack">
      @if (product.isLoading()) {
        <p role="status">Cargando producto…</p>
      } @else if (product.error()) {
        <p class="notice notice--danger" role="alert">No se pudo cargar el producto solicitado.</p>
      } @else if (product.hasValue()) {
        <h2 data-testid="lookup-name">{{ product.value().name }}</h2>
        <p>{{ product.value().description }}</p>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductLookupPage {
  readonly productId = input('');
  readonly product = httpResource<Product>(() => {
    const productId = this.productId();
    return productId ? `/api/products/${productId}` : undefined;
  });
}
