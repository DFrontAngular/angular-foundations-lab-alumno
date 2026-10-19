import { TestBed } from '@angular/core/testing';

import { verifyProductFormContract } from '../product-form-test.contract';
import ReactiveProductFormPage from './reactive-product-form-page';

describe('Lab 09A · Reactive Forms contract', () => {
  it('satisfies the shared product form behavior', async () => {
    await TestBed.configureTestingModule({ imports: [ReactiveProductFormPage] }).compileComponents();
    const fixture = TestBed.createComponent(ReactiveProductFormPage);
    await verifyProductFormContract(fixture, 'reactive');
  });
});
