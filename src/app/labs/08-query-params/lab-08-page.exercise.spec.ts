import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import Lab08Page from './lab-08-page';

describe('Lab 08 · query params', () => {
  it('restores and updates serializable filter state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'filters', component: Lab08Page }])],
    });

    const harness = await RouterTestingHarness.create('/filters?search=teclado&category=hardware');
    const host = harness.routeNativeElement as HTMLElement;
    const search = host.querySelector('#query-search') as HTMLInputElement;
    const category = host.querySelector('#query-category') as HTMLSelectElement;

    expect(search.value).toBe('teclado');
    expect(category.value).toBe('hardware');
    expect(host.querySelectorAll('[data-testid="query-product"]')).toHaveLength(1);

    search.value = 'ratón';
    search.dispatchEvent(new Event('input'));
    category.value = '';
    category.dispatchEvent(new Event('change'));
    (host.querySelector('form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );
    await TestBed.inject(ApplicationRef).whenStable();

    expect(TestBed.inject(Router).url).toBe('/filters?search=rat%C3%B3n');
  });
});
