import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

@Component({
  imports: [LabHeader, RouterOutlet],
  template: `
    <div class="container page">
      <app-lab-header labId="07" />
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RoutingLabShell {}
