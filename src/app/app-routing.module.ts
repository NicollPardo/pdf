import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescargaComponent } from './descarga/descarga.component';

const routes: Routes = [
  { path: 'descarga', component: DescargaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
