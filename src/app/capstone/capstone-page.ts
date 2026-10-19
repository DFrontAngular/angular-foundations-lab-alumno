import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

@Component({
  imports: [LabHeader, RouterLink],
  template: `
    <div class="container page">
      <app-lab-header labId="capstone" />
      <section class="card stack">
        <h2>Product Workspace</h2>
        <p>
          El código del capstone se crea dentro de <code>src/app/capstone/workspace/</code>.
          Empieza por el routing y una primera lectura remota; no diseñes toda la arquitectura de una vez.
        </p>
        <div class="grid grid--two">
          <article class="todo-box">
            <h3>Primera vertical</h3>
            <p>Ruta de listado → petición → estados de UI → una prueba.</p>
          </article>
          <article class="todo-box">
            <h3>Después</h3>
            <p>Filtros en URL, detalle, formulario, mutaciones, estado y cobertura crítica.</p>
          </article>
        </div>
        <a class="button button--secondary" routerLink="/">Volver al itinerario</a>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CapstonePage {}
