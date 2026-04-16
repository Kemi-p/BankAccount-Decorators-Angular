import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBalance',
  pure: false,
})
export class FormatBalancePipe implements PipeTransform {
  //R1002343.45
  transform(value: number, currency: string) {
    const parts = value.toFixed(2).split('.');
    let whole = parts[0];
    const decimal = parts[1];

    let result = '';

    while (whole.length > 3) {
      result = ' ' + whole.slice(-3) + result;
      whole = whole.slice(0, -3);
    }

    result = whole + result;

    return currency + result + '.' + decimal;
  }
}
