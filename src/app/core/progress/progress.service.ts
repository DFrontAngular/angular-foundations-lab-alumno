import { computed, Injectable, signal } from '@angular/core';

import { LABS, type LabId } from '@core/labs/lab-registry';

const STORAGE_KEY = 'angular-foundations-lab.progress.v1';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  readonly #completed = signal<ReadonlySet<LabId>>(this.#read());

  readonly completed = this.#completed.asReadonly();
  readonly completedCount = computed(() => this.#completed().size);
  readonly percentage = computed(() => Math.round((this.completedCount() / LABS.length) * 100));

  isCompleted(id: LabId): boolean {
    return this.#completed().has(id);
  }

  toggle(id: LabId): void {
    this.#completed.update((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      this.#write(next);
      return next;
    });
  }

  reset(): void {
    this.#completed.set(new Set());
    this.#write(new Set());
  }

  #read(): ReadonlySet<LabId> {
    try {
      const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (!raw) {
        return new Set();
      }

      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return new Set();
      }

      const knownIds = new Set(LABS.map((lab) => lab.id));
      const validIds = parsed.filter(
        (value): value is LabId => typeof value === 'string' && knownIds.has(value as LabId),
      );

      return new Set(validIds);
    } catch {
      return new Set();
    }
  }

  #write(value: ReadonlySet<LabId>): void {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify([...value]));
    } catch {
      // El progreso es una mejora no crítica. La app sigue siendo usable sin localStorage.
    }
  }
}
