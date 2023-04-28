import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './vehicle/list/list.component';
import { DetailComponent } from './vehicle/detail/detail.component';
import { EditComponent } from './vehicle/edit/edit.component';
import { AddComponent } from './vehicle/add/add.component';
import { MakersComponent } from './vehicleMaker/makers/makers.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'vehicles', component: ListComponent },
  { path: 'vehicles/add', component: AddComponent },
  { path: 'vehicles/:vin', component: DetailComponent },
  { path: 'vehicles/edit/:vin', component: EditComponent },
  { path: 'vehicleMakers', component: MakersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
