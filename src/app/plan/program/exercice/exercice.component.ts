import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CARDIO_TRAINING, Exercice, EXERCICE_TYPES, LESSON, REINFORCEMENT } from '../../../shared/program/exercice';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/form-utils';

const errorMessage = {
  categoryRequired: 'il faut choisir entre cours, cardio et renforcement',
  typeRequired: 'le type est obligatoire',
  durationRequired: 'la durée est obligatoire',
  speedRequired: 'la vitesse est obligatoire',
  nbRepetionRequired: 'le nombre de répétitions est obligatoire',
  nbMouvementRequired: 'le nombre de mouvements est obligatoire'
};

@Component({
  selector: 'sp-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss']
})
export class ExerciceComponent implements OnInit {

  @Output() exercice = new EventEmitter<Exercice>();

  exerciceForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.exerciceForm = this.formBuilder.group({
      category: this.formBuilder.control(''),
      type: this.formBuilder.control(''),
      duration: this.formBuilder.control(''),
      speed: this.formBuilder.control(''),
      weigth: this.formBuilder.control(''),
      nbRepetion: this.formBuilder.control(''),
      nbMouvement: this.formBuilder.control(''),
      comment: this.formBuilder.control('')
    }, { validator: this.getValidator() });
  }

  // TODO: validation:
  // category === LESSON => 'type' et 'duration' obligatoire
  // category === CARDIO_TRAINING => 'type', 'duration' et 'speed' obligatoire
  // category === REINFORCEMENT => 'type', 'nbRepetion' et 'nbMouvement' obligatoire


  addExercice(): void {
    if (this.exerciceForm.valid) {
      this.exercice.emit(this.exerciceForm.value);
    }
  }

  close(): void {
    this.exercice.emit(null);
  }

  getTitle(): string {
    return null;
  }

  resetForm() {
    this.exerciceForm.patchValue({
      type: '',
      duration: '',
      speed: '',
      weigth: '',
      nbRepetion: '',
      nbMouvement: ''
    });
  }

  private getValidator(): (FormGroup) => any {
    return formGroup => {
      if (!formGroup.get('category').value) {
        return { categoryRequired: true };
      }
      else if (formGroup.get('category').value === 'LESSON') {
        if (!formGroup.get('type').value || !formGroup.get('duration').value) {
          return { categoryRequired: true };
        }
      }
      else if (formGroup.get('category').value === 'CARDIO_TRAINING') {
        if (!formGroup.get('duration').value || !formGroup.get('speed').value) {
          return { categoryRequired: true };
        }
      }
      else if (formGroup.get('category').value === 'REINFORCEMENT') {
        if (!formGroup.get('type').value || !formGroup.get('nbRepetition').value || !formGroup.get('nbMouvement').value) {
          return { categoryRequired: true };
        }
      }
    }
  }

}
