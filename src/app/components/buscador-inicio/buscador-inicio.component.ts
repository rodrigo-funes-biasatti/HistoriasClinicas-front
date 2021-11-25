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

  constructor(
    public spinnerService: SpinnerService,
    private pacienteService: PacientesService,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackbarService) { }


  ngOnInit(): void {
  }

  buscarPaciente(): void {
    this.localStorageService.clearPacienteSeleccionado();
    this.pacienteService.findByNamePatient(this.formSearcher.value).subscribe((res) => {
      this.pacienteService.dispararEventoPacientesEncontrados(res);
    },
    () => {
      this.snackBarService.openSnackBarError("No se han encotrado resultados.", "Cerrar");
    })
  }
}
