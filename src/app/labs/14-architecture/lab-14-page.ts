import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

import { LegacyCatalogPage } from './legacy-catalog-page';

@Component({
  imports: [LabHeader, LegacyCatalogPage],
  template: `
    <div class="container page">
      <app-lab-header labId="14" />
      <section class="grid grid--two">
        <article class="card stack">
          <h2>Antes: componente acoplado</h2>
          <app-legacy-catalog />
        </article>
        <article class="card stack">
          <h2>Objetivo del refactor</h2>
          <ol>
            <li>Data access aislado.</li>
            <li>Estado de feature encapsulado.</li>
            <li>UI presentacional.</li>
            <li>Página de composición.</li>
            <li>Decisiones documentadas.</li>
          </ol>
          <div class="todo-box">Trabaja dentro de <code>refactor/</code>.</div>
        </article>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab14Page {}
