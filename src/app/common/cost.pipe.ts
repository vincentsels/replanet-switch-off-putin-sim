import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cost' })
export class CostPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '';

    let ret = '€\u00A0';

    if (Math.abs(value) > 100000000) {
      // Larger than: 100.000.000: show as billion
      const val = Math.round(value / 1000000000 * 100) / 100;
      return ret + val + '\u00A0' + 'B';
    } else if (Math.abs(value) > 500000) {
      // Larger than: 500.000: show as million
      const val = Math.round(value / 1000000 * 100) / 100;
      return ret + val + '\u00A0' + 'M';
    } else {
      // Else: show as k
      const val = Math.round(value / 1000 * 100) / 100;
      return ret + val + '\u00A0' + 'k';
    }
  }
}
