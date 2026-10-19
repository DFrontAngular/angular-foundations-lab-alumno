import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({ name: 'stockLabel' })
export class StockLabelPipe implements PipeTransform {
  transform(stock: number): string {
    // TODO: aplica las tres reglas de stock definidas en el enunciado.
    void stock;
    return 'Pendiente';
  }
}
