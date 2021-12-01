import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorInicioComponent } from './components/buscador-inicio/buscador-inicio.component';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';
import { FormularioPacienteComponent } from './components/formulario-paciente/formulario-paciente.component';
import { FormularioHistoriasClinicasComponent } from './components/formulario-historias-clinicas/formulario-historias-clinicas.component';

const routes: Routes = [
  { path: 'buscar', component: BuscadorInicioComponent },
  { path: 'pacientes', component: ListadoPacientesComponent },
  { path: 'formulario-paciente/:modo', component: FormularioPacienteComponent },
  { path: 'formulario-historias-clinicas', component: FormularioHistoriasClinicasComponent},
  { path: '', redirectTo: 'buscar', pathMatch: 'full' },
  { path: '**', redirectTo: 'buscar' }
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
