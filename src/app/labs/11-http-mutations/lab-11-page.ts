import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import type { ProductsResponse } from '@shared/domain/product.models';
import { LabHeader } from '@shared/ui/lab-header/lab-header';

import { ProductsApi } from './products-api';

@Component({
  imports: [LabHeader],
  providers: [ProductsApi],
  templateUrl: './lab-11-page.html',
  styleUrl: './lab-11-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab11Page {
  readonly #api = inject(ProductsApi);

  readonly products = httpResource<ProductsResponse>(() => '/api/products?limit=6');
  readonly newProductName = signal('');
  readonly busy = signal(false);
  readonly feedback = signal('');
  readonly error = signal('');

  onName(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.newProductName.set(target.value);
    }
  }

  async create(): Promise<void> {
    // TODO: usa firstValueFrom, controla busy/error y recarga products al terminar.
  }

  async remove(productId: string): Promise<void> {
    // TODO: aplica el mismo ciclo de mutación y feedback para DELETE.
    void productId;
  }

  describeError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.error?.message ?? `Error HTTP ${error.status}`;
    }
    return 'Se produjo un error inesperado.';
  }
}
