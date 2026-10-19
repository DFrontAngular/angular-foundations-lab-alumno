import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LABS } from '@core/labs/lab-registry';
import { ProgressService } from '@core/progress/progress.service';

@Component({
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  readonly labs = LABS.filter((lab) => lab.id !== 'capstone');
  readonly capstone = LABS.find((lab) => lab.id === 'capstone');
  readonly #progress = inject(ProgressService);

  readonly completedCount = this.#progress.completedCount;
  readonly percentage = this.#progress.percentage;
  readonly blocks = computed(() => [...new Set(this.labs.map((lab) => lab.block))]);

  isCompleted(id: (typeof LABS)[number]['id']): boolean {
    return this.#progress.isCompleted(id);
  }

  resetProgress(): void {
    this.#progress.reset();
  }
}
