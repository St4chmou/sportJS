import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Program } from './program';

@Injectable()
export class ProgramService {

  constructor(private http: Http) {
    this.http.get('/api/programs')
      .filter(res => res.status == 200)
      .subscribe(response => {
        console.log(response.json());
      });
  }

  /**
   * voir la page /plan, il doit y avoir 3 éléments
   * @returns {null}
   */
  findAll(): Observable<Program[]> {
    return this.http.get('/api/programs')
      .filter(res => res.status == 200)
      .map(response => {
        return response.json()
      });
  }

  /**
   * voir la page /run, le switch doit avoir 3 élément + autre
   * @returns {null}
   */
  findAllPlusEmpty(): Observable<Program[]> {
    return this.findAll()
    .map(programs => [...programs, {name: 'Autre'}]);
  }

  /**
   * accéder au détail d'un programme /plan/0
   * @param index
   * @returns {null}
   */
  getProgramByIndex(index: number): Observable<any> {
    return this.http.get('/api/programs/' + index)
      .filter(res => res.status == 200)
      .map(response => {
        return response.json()
      });
  }

  /**
   * faites une mise à jour d'un programme (description ?) et faites un rafraïchissment de la page
   * @param index
   * @param program
   */
  updateProgram(index: number, program: Program): void {
    this.http.post(`/api/programs/${index}`, program).subscribe();
  }

  /**
   * créez un programme
   * @param program
   */
  addProgram(program: Program): void {
    this.http.post('/api/programs', program).subscribe();
  }

  /**
   * supprimer un programme
   * @param index
   */
  deleteProgram(index: number): void {
    this.http.delete(`/api/programs/${index}`).subscribe();
  }
}
