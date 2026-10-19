import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App smoke test', () => {
  it('renders the application shell', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const header = fixture.nativeElement.querySelector('header') as HTMLElement | null;
    expect(header?.textContent).toContain('Angular Foundations');
  });
});
