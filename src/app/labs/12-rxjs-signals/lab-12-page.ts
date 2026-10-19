import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';

import { LabHeader } from '@shared/ui/lab-header/lab-header';

interface SuggestionsResponse {
  readonly items: readonly string[];
}

@Component({
  imports: [LabHeader],
  templateUrl: './lab-12-page.html',
  styleUrl: './lab-12-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Lab12Page {
  readonly #http = inject(HttpClient);
  readonly query = signal('');
  readonly #queryChanges = toObservable(this.query);

  readonly suggestions = toSignal(
    // TODO: sustituye el observable vacío por debounceTime + distinctUntilChanged + switchMap.
    of<SuggestionsResponse>({ items: [] }).pipe(map((response) => response.items)),
    { initialValue: [] as readonly string[] },
  );

  onQuery(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.query.set(target.value);
    }
  }
}
