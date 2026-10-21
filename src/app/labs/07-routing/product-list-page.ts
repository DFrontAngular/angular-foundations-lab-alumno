import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEMO_PRODUCTS } from '@shared/data/catalog.data';

@Component({
  template: `
    <section class="card stack">
      <div>
        <p class="muted">Ruta hija: products</p>
        <h2>Productos</h2>
      </div>
      <ul>
        @for (product of products; track product.id) {
          <li>
            <span>{{ product.name }}</span>
            <span>TODO: enlaza al detalle con RouterLink</span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    ul { display: grid; gap: .65rem; margin: 0; padding: 0; list-style: none; }
    li { display: flex; justify-content: space-between; gap: 1rem; padding: .9rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListPage {
  readonly products = DEMO_PRODUCTS;
}
