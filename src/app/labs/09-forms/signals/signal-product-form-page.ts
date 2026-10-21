import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <section class="form-layout">
      <div class="card product-form">
        <span class="variant-badge">Signal Forms</span>
        <h2>Alta de producto</h2>
        <div class="todo-box">TODO: crea el modelo, el schema, los campos y el submit.</div>
      </div>
    </section>
  `,
  styleUrl: '../product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalProductFormPage {
  // TODO: crea el modelo signal, el FieldTree, las reglas y el flujo de submit.
}
