import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface DiagnosticProduct {
  readonly id: string;
  readonly name: string;
}

@Component({
  selector: 'app-diagnostic-page',
  template: `
    <h1>Catálogo diagnóstico</h1>
    <label>
      Buscar
      <input type="search" />
    </label>
    <!-- TODO: representar productos, estado vacío y composición con una tarjeta. -->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagnosticPage {
  readonly products = signal<readonly DiagnosticProduct[]>([
    { id: '1', name: 'Teclado' },
    { id: '2', name: 'Ratón' },
  ]);
  readonly query = signal('');
  readonly visibleProducts = computed(() => this.products());
}
