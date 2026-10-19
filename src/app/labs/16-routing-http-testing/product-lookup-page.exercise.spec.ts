import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import ProductLookupPage from './product-lookup-page';

describe('Lab 16 · Router and HTTP integration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [{ path: 'products/:productId', component: ProductLookupPage }],
          withComponentInputBinding(),
        ),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it.todo('navigates to an ID, flushes the matching request and renders the product');
  it.todo('renders a recoverable message after a 404 response');
  it.todo('requests the new product when the route parameter changes');

  // Empieza con RouterTestingHarness.create('/products/p-100') y HttpTestingController.
  void RouterTestingHarness;
});
