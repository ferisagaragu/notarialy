import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): unknown {
    const dateOut = moment(value);
    dateOut.locale('es');
    return dateOut.format('DD [de] MMMM [del] YYYY');
  }

}
