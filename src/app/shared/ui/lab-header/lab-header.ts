import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getLab, type LabId } from '@core/labs/lab-registry';
import { ProgressService } from '@core/progress/progress.service';

@Component({
  selector: 'app-lab-header',
  imports: [RouterLink],
  templateUrl: './lab-header.html',
  styleUrl: './lab-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabHeader {
  readonly labId = input.required<LabId>();
  readonly #progress = inject(ProgressService);

  readonly lab = computed(() => getLab(this.labId()));
  readonly completed = computed(() => this.#progress.isCompleted(this.labId()));

  toggleCompleted(): void {
    this.#progress.toggle(this.labId());
  }
}
