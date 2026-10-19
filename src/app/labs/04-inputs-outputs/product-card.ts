import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { Product } from '@shared/domain/product.models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly favorite = input(false);
  readonly favoriteChange = output<string>();

  requestFavoriteChange(): void {
    this.favoriteChange.emit(this.product().id);
  }
}
