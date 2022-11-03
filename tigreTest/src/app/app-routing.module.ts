import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimalComponent } from './animal/animal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'animals', component: AnimalComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: AnimalDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }