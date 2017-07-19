import { Record } from './../record/record';
import { ExerciceCategory } from './../program/exercice';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreStats'
})
export class FiltreStatsPipe implements PipeTransform {

  transform(value: Array<Record>, category: ExerciceCategory): Array<Record> {
    if (!category || !value) {
      return value;
    }
    else {
      return value.filter(record => {
        return record.category === category;
      });
    }
  }

}
