import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

@Component({
  imports: [LabHeader, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="container page">
      <app-lab-header labId="09" />
      <nav class="forms-nav" aria-label="Variantes del ejercicio de formularios">
        <a routerLink="./" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">
          Comparación
        </a>
        <a routerLink="reactive" routerLinkActive="is-active">Reactive Forms</a>
        <a routerLink="signals" routerLinkActive="is-active">Signal Forms</a>
      </nav>
      <router-outlet />
    </div>
  `,
  styles: `
    .forms-nav { display: flex; flex-wrap: wrap; gap: .5rem; padding: .5rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #fff; }
    .forms-nav a { padding: .65rem .85rem; border-radius: .4rem; color: var(--color-text); text-decoration: none; font-weight: 800; }
    .forms-nav a.is-active { color: #171717; background: #f3b61f; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormsLabShell {}
