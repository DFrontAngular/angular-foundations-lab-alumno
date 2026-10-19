import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <section class="card stack">
      <div>
        <p class="muted">Una especificación, dos implementaciones</p>
        <h2>Resuelve ambas variantes</h2>
        <p>
          El contrato de comportamiento es idéntico. No cambies reglas ni simplifiques una variante
          para que parezca mejor que la otra.
        </p>
      </div>
      <div class="grid grid--two">
        <article class="option">
          <h3>Reactive Forms</h3>
          <p>Modelo explícito de controles, observables de estado y validadores sobre el árbol.</p>
          <a class="button" routerLink="reactive">Abrir variante</a>
        </article>
        <article class="option">
          <h3>Signal Forms</h3>
          <p>Modelo de datos basado en signals, FieldTree, schema y ciclo de submit integrado.</p>
          <a class="button" routerLink="signals">Abrir variante</a>
        </article>
      </div>
      <div class="notice">
        Las dos pruebas reutilizan el mismo helper de contrato en
        <code>product-form-test.contract.ts</code>.
      </div>
    </section>
  `,
  styles: `
    .option { display: grid; align-content: start; gap: 1rem; padding: 1.25rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #faf9f6; }
    .option .button { width: fit-content; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormsOverviewPage {}
