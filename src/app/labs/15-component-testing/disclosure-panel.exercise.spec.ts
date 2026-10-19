import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DisclosurePanel } from './disclosure-panel';

@Component({
  imports: [DisclosurePanel],
  template: `
    <app-disclosure-panel title="Ayuda" panelId="help-panel">
      <p>Contenido de ayuda</p>
    </app-disclosure-panel>
  `,
})
class TestHost {}

describe('Lab 15 · disclosure component', () => {
  it('opens the panel through its public UI', async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(host.querySelector('[data-testid="disclosure-content"]')).toBeNull();

    button.click();
    await fixture.whenStable();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(host.querySelector('[data-testid="disclosure-content"]')?.textContent).toContain(
      'Contenido de ayuda',
    );
  });
});
