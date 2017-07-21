import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatComponent } from './stat.component';
import { SynthesisComponent } from "./visualization/synthesis/synthesis.component";
import { GraphComponent } from "./visualization/graph/graph.component";

const routes: Routes = [{
  path: '',
  component: StatComponent,
  children: [{
    path: '',
    redirectTo: 'synthesis',
    pathMatch: 'full'
  }, {
    path: 'graph',
    component: GraphComponent
  },
  {
    path: 'synthesis',
    component: SynthesisComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatRoutingModule { }
