import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'retourLigne'
})
export class RetourLignePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }

}
