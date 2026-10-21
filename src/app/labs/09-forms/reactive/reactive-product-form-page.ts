import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <section class="form-layout">
      <div class="card product-form">
        <span class="variant-badge">Reactive Forms</span>
        <h2>Alta de producto</h2>
        <div class="todo-box">TODO: crea el FormGroup, los controles, las reglas y el submit.</div>
      </div>
    </section>
  `,
  styleUrl: '../product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactiveProductFormPage {
  // TODO: crea el FormGroup tipado, sus validadores y el flujo de submit.
}
