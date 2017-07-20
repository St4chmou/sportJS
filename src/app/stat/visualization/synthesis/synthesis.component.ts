import { Subscription } from 'rxjs/Subscription';
import { HeartBeat } from './../../../shared/record/heart-beat';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecordStoreService } from "../../record-store.service";
import { Observable } from "rxjs/Observable";
import { Record } from "../../../shared/record/record";
import 'rxjs/add/operator/reduce'
import 'rxjs/add/operator/max'
import 'rxjs/add/operator/min'
import 'rxjs/add/operator/last'
import 'rxjs/add/observable/from'
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'sp-synthesis',
  templateUrl: './synthesis.component.html',
  styleUrls: ['./synthesis.component.scss']
})
export class SynthesisComponent implements OnInit, OnDestroy {

  record$: Observable<Record>;

  constructor(private recordStoreService: RecordStoreService) { }

  ngOnInit() {
    this.record$ = this.recordStoreService.getSelectedRecord$();
  }

  ngOnDestroy(): void {
  }

  getType$(): Observable<string> {
    return this.record$
      .filter(record => !!record)
      .map(record => {
        return record.type;
      })
  }

  getDuration$(): Observable<string> {
    return this.record$
      .filter(record => !!record)
      .mergeMap(record => Observable.from(record.heartBeats).last())
      .map(heartBeat => {
        return heartBeat.x.toString() + ' secondes';
      });
  }

  getMax$(): Observable<number> {
    return this.record$
      .filter(record => !!record)
      .mergeMap(record => Observable.from(record.heartBeats)
        .map(heartBeat => heartBeat.y)
        .max())
  }

  getMin$(): Observable<number> {
    return this.record$
      .filter(record => !!record)
      .mergeMap(record => Observable.from(record.heartBeats)
        .map(heartBeat => heartBeat.y)
        .min()
      )
  }

  getAverage$(): Observable<number> {
    return this.record$
      .filter(record => !!record)
      .mergeMap(record => Observable.from(record.heartBeats)
        .map(heartBeat => heartBeat.y)
        .reduce(cumulPourMoyenne, { somme: 0, nombreElement: 0 })
        .map(cumul => cumul.somme / cumul.nombreElement));

    function cumulPourMoyenne(cumul, y) {
      return {
        somme: cumul.somme + y,
        nombreElement: cumul.nombreElement + 1
      };
    }
  }
}
