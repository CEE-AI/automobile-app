import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {path:'',
  redirectTo:'customer-form',
  pathMatch:'full'},
  {path:'customer-form', component:CustomerFormComponent},
  {path:'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
