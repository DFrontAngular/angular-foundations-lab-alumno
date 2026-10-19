import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-disclosure-panel',
  template: `
    <section>
      <h2>
        <button
          type="button"
          [attr.aria-expanded]="expanded()"
          [attr.aria-controls]="panelId()"
          (click)="toggle()"
        >
          {{ title() }}
        </button>
      </h2>
      @if (expanded()) {
        <div [id]="panelId()" data-testid="disclosure-content">
          <ng-content />
        </div>
      }
    </section>
  `,
  styles: `
    section { border: 1px solid var(--color-border); border-radius: var(--radius-sm); }
    h2 { margin: 0; }
    button { width: 100%; padding: 1rem; border: 0; text-align: left; font-weight: 850; background: #f4f1e9; cursor: pointer; }
    div { padding: 1rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclosurePanel {
  readonly title = input.required<string>();
  readonly panelId = input.required<string>();
  readonly expandedChange = output<boolean>();
  readonly expanded = signal(false);

  toggle(): void {
    // TODO: actualiza el estado y emite el nuevo valor.
  }
}
