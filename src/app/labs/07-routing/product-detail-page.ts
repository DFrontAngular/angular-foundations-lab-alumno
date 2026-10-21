import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DEMO_PRODUCTS } from '@shared/data/catalog.data';

@Component({
  imports: [RouterLink],
  template: `
    <section class="card stack">
      <a routerLink="../../products">← Volver al listado</a>
      @if (product(); as current) {
        <p class="muted">Ruta hija: products/:productId</p>
        <h2 data-testid="detail-name">{{ current.name }}</h2>
        <p>{{ current.description }}</p>
      } @else {
        <div class="notice notice--danger" role="alert" data-testid="missing-product">
          No existe un producto con el identificador «{{ productId() }}».
        </div>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetailPage {
  readonly productId = input('');
  readonly product = computed(() => {
    // TODO: encuentra el producto cuyo id coincide con el parámetro de ruta.
    return undefined;
  });
}
