import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getLabBySlug } from '@core/labs/lab-registry';

@Component({
  imports: [RouterLink],
  templateUrl: './lab-guide-page.html',
  styleUrl: './lab-guide-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LabGuidePage {
  readonly slug = input.required<string>();
  readonly lab = computed(() => getLabBySlug(this.slug()));
  readonly verificationCommand = computed(() => {
    const { id } = this.lab();
    return id === '09'
      ? 'npm run test:exercise -- 09-reactive  # o 09-signals'
      : `npm run test:exercise -- ${id}`;
  });
}
