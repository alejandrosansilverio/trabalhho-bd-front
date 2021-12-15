import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraficoViewComponent } from './grafico-view/grafico-view.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: GraficoViewComponent},
  {path: 'home', component: GraficoViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
