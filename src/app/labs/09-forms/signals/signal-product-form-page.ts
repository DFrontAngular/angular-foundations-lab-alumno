import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  min,
  minLength,
  required,
} from '@angular/forms/signals';

import { CATEGORIES } from '@shared/data/catalog.data';
import type { ProductDraft } from '@shared/domain/product.models';

import {
  EMPTY_PRODUCT_DRAFT,
  normalizeProductDraft,
  subcategoriesFor,
} from '../product-form.domain';

@Component({
  imports: [FormField, FormRoot, JsonPipe],
  templateUrl: './signal-product-form-page.html',
  styleUrl: '../product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalProductFormPage {
  readonly categories = CATEGORIES;
  readonly model = signal<ProductDraft>({ ...EMPTY_PRODUCT_DRAFT });
  readonly submitted = signal<ProductDraft | null>(null);

  readonly productForm = form(
    this.model,
    (path) => {
      required(path.name, { message: 'El nombre es obligatorio.' });
      minLength(path.name, 3, { message: 'El nombre debe tener al menos 3 caracteres.' });
      maxLength(path.name, 80, { message: 'El nombre no puede superar 80 caracteres.' });
      required(path.categoryId, { message: 'La categoría es obligatoria.' });
      required(path.subcategoryId, { message: 'La subcategoría es obligatoria.' });
      min(path.basePrice, 0.01, { message: 'El precio base debe ser mayor que cero.' });
      min(path.salePrice, 0, { message: 'El precio promocional no puede ser negativo.' });
      min(path.stock, 0, { message: 'El stock no puede ser negativo.' });
      maxLength(path.description, 240, {
        message: 'La descripción no puede superar 240 caracteres.',
      });

      // TODO: añade las mismas tres reglas cruzadas que en Reactive Forms:
      // subcategoría válida, precio promocional inferior y stock físico obligatorio.
    },
    {
      submission: {
        action: async (field) => {
          this.submitted.set(normalizeProductDraft(field().value()));
        },
      },
    },
  );

  readonly subcategories = computed(() =>
    subcategoriesFor(this.productForm.categoryId().value()),
  );

  onCategoryChanged(event: Event): void {
    // TODO: usa la categoría del evento y limpia el FieldTree de subcategoría si deja de ser válido.
    void event;
  }
}
