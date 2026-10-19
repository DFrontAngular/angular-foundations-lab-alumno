import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import routes from './lab-07.routes';

describe('Lab 07 · routing', () => {
  it('navigates from the list to a product detail', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding())] });
    const harness = await RouterTestingHarness.create('/products');
    const link = harness.routeNativeElement?.querySelector('a[href="/products/p-100"]') as
      | HTMLAnchorElement
      | null;

    expect(link).not.toBeNull();
    link?.click();
    await TestBed.inject(ApplicationRef).whenStable();

    expect(harness.routeNativeElement?.textContent).toContain('Teclado mecánico TKL');
  });
});
