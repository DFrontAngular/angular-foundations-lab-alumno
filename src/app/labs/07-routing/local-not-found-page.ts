import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <section class="card">
      <h2>Ruta de la feature no encontrada</h2>
      <a routerLink="../products">Ir al listado</a>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LocalNotFoundPage {}
