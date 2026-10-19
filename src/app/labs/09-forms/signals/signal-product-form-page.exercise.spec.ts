import { TestBed } from '@angular/core/testing';

import { verifyProductFormContract } from '../product-form-test.contract';
import SignalProductFormPage from './signal-product-form-page';

describe('Lab 09B · Signal Forms contract', () => {
  it('satisfies the shared product form behavior', async () => {
    await TestBed.configureTestingModule({ imports: [SignalProductFormPage] }).compileComponents();
    const fixture = TestBed.createComponent(SignalProductFormPage);
    await verifyProductFormContract(fixture, 'signal');
  });
});
