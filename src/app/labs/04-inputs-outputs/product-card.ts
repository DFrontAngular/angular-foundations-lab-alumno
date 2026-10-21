import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  // TODO: define los inputs product/favorite y el output favoriteChange.
}
