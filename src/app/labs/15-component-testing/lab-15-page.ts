import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

import { DisclosurePanel } from './disclosure-panel';

@Component({
  imports: [LabHeader, DisclosurePanel],
  template: `
    <div class="container page">
      <app-lab-header labId="15" />
      <section class="card stack">
        <p class="muted">Componente bajo prueba</p>
        <app-disclosure-panel title="Detalles del producto" panelId="product-details">
          <p>El contenido solo debe existir cuando el panel está abierto.</p>
        </app-disclosure-panel>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab15Page {}
