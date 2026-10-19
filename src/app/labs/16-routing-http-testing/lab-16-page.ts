import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

@Component({
  imports: [LabHeader, RouterLink, RouterOutlet],
  template: `
    <div class="container page">
      <app-lab-header labId="16" />
      <section class="card stack">
        <h2>Escenarios manuales</h2>
        <div class="cluster">
          <a class="button button--secondary" routerLink="products/p-100">Producto existente</a>
          <a class="button button--secondary" routerLink="products/not-found">Producto inexistente</a>
        </div>
      </section>
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab16Page {}
