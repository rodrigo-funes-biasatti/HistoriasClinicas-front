import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorInicioComponent } from './components/buscador-inicio/buscador-inicio.component';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';

const routes: Routes = [
  { path: 'buscar', component: BuscadorInicioComponent },
  { path: 'pacientes', component: ListadoPacientesComponent},
  { path: '', redirectTo: 'buscar', pathMatch: 'full'},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
