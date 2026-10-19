import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  templateUrl: './diagnostic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DiagnosticPage {}
