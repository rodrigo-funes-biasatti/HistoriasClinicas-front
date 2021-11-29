import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { labels } from 'src/app/constants/labels';
import { Paciente } from 'src/app/models/paciente';
import { PacientesService } from 'src/app/services/pacientes.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { criterios_busqueda } from 'src/app/constants/criterios-busqueda';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador-inicio',
  templateUrl: './buscador-inicio.component.html',
  styleUrls: ['./buscador-inicio.component.css']
})
export class BuscadorInicioComponent implements OnInit {

  @Output() pacienteBuscado: EventEmitter<Paciente[]> = new EventEmitter();

  labels: any = {
    titulo: labels.titulo,
    buscar_paciente: labels.buscar_paciente
  }
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  formSearcher = new FormControl();

  showSpinner: boolean = false;

  criterio_busqueda_seleccionado: criterios_busqueda = criterios_busqueda.dni;

  constructor(
    public spinnerService: SpinnerService,
    private pacienteService: PacientesService,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackbarService,
    private router: Router) { }


  ngOnInit(): void {
    this.localStorageService.clearPacienteSeleccionado();
  }

  buscarPaciente(): void {
    this.localStorageService.clearPacienteSeleccionado();
    this.definirCriterioBusqueda();
    switch (this.criterio_busqueda_seleccionado) {
      case criterios_busqueda.dni: this.ejecutarBusquedaPorDni(); break;
      case criterios_busqueda.nombre: this.ejecutarBusquedaPorNombre(); break;
    }
  }

  definirCriterioBusqueda(): void {
    if (!Number(this.formSearcher.value)) {
      this.criterio_busqueda_seleccionado = criterios_busqueda.nombre;
    }
  }

  ejecutarBusquedaPorDni(): void {
    this.pacienteService.findByDniPatient(this.formSearcher.value).subscribe((res) => {
      this.pacienteService.dispararEventoPacientesEncontrados(res);
      this.router.navigate(['/pacientes']);
    },
      (err) => {
        err.status == 404 ?
          this.snackBarService.openSnackBarError("No se han encotrado resultados.", "Cerrar") :
          this.snackBarService.openSnackBarError("Ha habido un error en el servidor: " + err.error.message, "Cerrar");
      });
  }

  ejecutarBusquedaPorNombre(): void {
    this.pacienteService.findByNamePatient(this.formSearcher.value).subscribe((res) => {
      this.pacienteService.dispararEventoPacientesEncontrados(res);
      this.router.navigate(['/pacientes']);
    },
      (err) => {
        err.status == 404 ?
          this.snackBarService.openSnackBarError("No se han encotrado resultados.", "Cerrar") :
          this.snackBarService.openSnackBarError("Ha habido un error en el servidor: " + err.error.message, "Cerrar");
      });
  }
}
