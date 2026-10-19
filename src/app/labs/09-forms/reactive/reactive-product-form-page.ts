import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  type ValidationErrors,
  type ValidatorFn,
  Validators,
} from '@angular/forms';

import { CATEGORIES } from '@shared/data/catalog.data';
import type { ProductDraft } from '@shared/domain/product.models';

import {
  normalizeProductDraft,
  subcategoriesFor,
  validateProductRules,
  type ProductRuleError,
} from '../product-form.domain';

const productRulesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // TODO: transforma validateProductRules(control.getRawValue()) en errores del FormGroup.
  void control;
  return null;
};

@Component({
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './reactive-product-form-page.html',
  styleUrl: '../product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactiveProductFormPage {
  readonly #formBuilder = inject(FormBuilder);
  readonly categories = CATEGORIES;
  readonly submitted = signal<ProductDraft | null>(null);
  readonly attempted = signal(false);

  readonly form = this.#formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      description: ['', [Validators.maxLength(240)]],
      categoryId: ['', [Validators.required]],
      subcategoryId: ['', [Validators.required]],
      kind: this.#formBuilder.nonNullable.control<'physical' | 'digital'>('physical'),
      basePrice: [0, [Validators.required, Validators.min(0.01)]],
      salePrice: [0, [Validators.min(0)]],
      stock: [0, [Validators.min(0)]],
    },
    { validators: [productRulesValidator] },
  );

  readonly #categoryId = toSignal(this.form.controls.categoryId.valueChanges, {
    initialValue: this.form.controls.categoryId.value,
  });
  readonly subcategories = computed(() => subcategoriesFor(this.#categoryId()));

  onCategoryChanged(event: Event): void {
    // TODO: usa la categoría del evento y limpia la subcategoría si deja de ser válida.
    void event;
  }

  hasRuleError(error: ProductRuleError): boolean {
    return this.form.hasError(error) && (this.form.touched || this.attempted());
  }

  submit(): void {
    this.attempted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.submitted.set(null);
      return;
    }

    this.submitted.set(normalizeProductDraft(this.form.getRawValue()));
  }
}
