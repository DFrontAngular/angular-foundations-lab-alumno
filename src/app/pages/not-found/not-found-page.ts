import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <div class="container page">
      <section class="card">
        <p class="muted">404</p>
        <h1>La ruta no existe.</h1>
        <p>Vuelve al itinerario para continuar con un laboratorio disponible.</p>
        <a class="button" routerLink="/">Volver al inicio</a>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundPage {}
