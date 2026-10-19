import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { Product, ProductsResponse } from '@shared/domain/product.models';

@Component({
  selector: 'app-legacy-catalog',
  template: `
    <div class="legacy">
      <button class="button" type="button" (click)="load()">Cargar ejemplo acoplado</button>
      <p>{{ message() }}</p>
      <ul>
        @for (product of products(); track product.id) {
          <li>{{ product.name }}</li>
        }
      </ul>
    </div>
  `,
  styles: `.legacy { display: grid; gap: 1rem; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyCatalogPage {
  readonly #http = inject(HttpClient);
  readonly products = signal<readonly Product[]>([]);
  readonly message = signal('Este componente concentra demasiadas responsabilidades.');

  async load(): Promise<void> {
    this.message.set('Cargando…');
    const response = await firstValueFrom(
      this.#http.get<ProductsResponse>('/api/products?limit=4'),
    );
    const sorted = [...response.items].sort((left, right) => left.name.localeCompare(right.name));
    globalThis.localStorage?.setItem('legacy-products', JSON.stringify(sorted));
    this.products.set(sorted);
    this.message.set(`${sorted.length} productos cargados y persistidos.`);
  }
}
