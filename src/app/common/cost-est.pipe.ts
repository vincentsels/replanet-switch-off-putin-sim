import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'costEst' })
export class CostEstPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '';

    if (Math.abs(value) > 100000000) {
      // Larger than 100.000.000
      return '€€€€€€';
    } else if (Math.abs(value) > 50000000) {
      // Larger than 50.000.000
      return '€€€€€';
    } else if (Math.abs(value) > 10000000) {
      // Larger than 10.000.000
      return '€€€€';
    } else if (Math.abs(value) > 1000000) {
      // Larger than 1.000.000
      return '€€€';
    } else if (Math.abs(value) > 500000) {
      // Larger than 500.000
      return '€€';
    } else {
      return '€';
    }
  }
}
