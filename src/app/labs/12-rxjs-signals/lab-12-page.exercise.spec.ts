import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Lab12Page from './lab-12-page';

describe('Lab 12 · RxJS and signals', () => {
  it('debounces and renders remote suggestions', async () => {
    await TestBed.configureTestingModule({
      imports: [Lab12Page],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Lab12Page);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const input = host.querySelector('#suggestion-query') as HTMLInputElement;

    input.value = 'te';
    input.dispatchEvent(new Event('input'));
    await new Promise((resolve) => setTimeout(resolve, 280));

    const http = TestBed.inject(HttpTestingController);
    const request = http.expectOne(
      (candidate) => candidate.url === '/api/suggestions' && candidate.params.get('q') === 'te',
    );
    request.flush({ items: ['Teclado mecánico', 'Teclado compacto'] });
    await fixture.whenStable();

    expect(host.querySelectorAll('[data-testid="suggestion"]')).toHaveLength(2);
    http.verify();
  });
});
