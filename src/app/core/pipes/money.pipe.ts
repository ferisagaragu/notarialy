import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: number): unknown {
    if (value) {
      return `${new Intl.NumberFormat("en-US").format(value)} MNX`;
    } else {
      return '0 MNX';
    }
  }

}
