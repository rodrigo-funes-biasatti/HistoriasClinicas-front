import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './inicio/inicio.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CustomInterceptor } from './interceptors/custom.interceptor';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BuscadorInicioComponent } from './components/buscador-inicio/buscador-inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { BotonFlotanteComponent } from './components/boton-flotante/boton-flotante.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfoPacienteSeleccionadoComponent } from './components/info-paciente-seleccionado/info-paciente-seleccionado.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormularioPacienteComponent } from './components/formulario-paciente/formulario-paciente.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BuscadorInicioComponent,
    BotonFlotanteComponent,
    InfoPacienteSeleccionadoComponent,
    ListadoPacientesComponent,
    FormularioPacienteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatTooltipModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  }, { provide: MAT_DATE_LOCALE, useValue: 'es-AR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
