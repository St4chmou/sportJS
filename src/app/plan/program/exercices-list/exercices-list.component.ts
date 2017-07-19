import { SelectableExercice } from './../../../shared/program/selectableExercice';
import { Component, Input, OnInit } from '@angular/core';
import { Exercice } from '../../../shared/program/exercice';

@Component({
  selector: 'sp-exercices-list',
  templateUrl: './exercices-list.component.html',
  styleUrls: ['./exercices-list.component.scss']
})
export class ExercicesListComponent implements OnInit {

  @Input() exercices: SelectableExercice[];

  constructor() { }

  ngOnInit() {
    this.exercices.map(element => element.selected = false);
  }

  delete(index: number): void {
    this.exercices.splice(index, 1);
  }

  getClasseByCategorie(categorie: string): string {
    if (categorie === 'LESSON') {
      return 'flaticon-people';
    } else if (categorie === 'CARDIO_TRAINING') {
      return 'flaticon-man-cycling';
    } else {
      return 'flaticon-weightlifting';
    }
  }

  inverser2Exercices(i: number, j: number) {
    let temp: SelectableExercice = this.exercices[i];
    this.exercices[i] = this.exercices[j];
    this.exercices[j] = temp;
  }

  deplacerHaut(index: number): void {
    this.inverser2Exercices(index - 1, index);
  }

  deplacerBas(index: number): void {
    this.inverser2Exercices(index, index + 1);
  }

  selectExercice(exercice: SelectableExercice) {
    exercice.selected = !exercice.selected;
  }

  isSelected(exercice: SelectableExercice): boolean {
    return exercice.selected;
  }

  oneIsSelected(): boolean {
    for (const exercice of this.exercices) {
      if (this.isSelected(exercice)) {
        return true;
      }
    }
    return false;
  }

  deleteSelectedExercices() {
    this.exercices = this.exercices.filter(exercice => {
      return !this.isSelected(exercice);
    });
  }

}
