import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { labels } from 'src/app/constants/labels';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit {

  pacientes: any = [];

  constructor(private pacientesService: PacientesService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.pacientesService.pacientesEncontrados.subscribe(res => {
      this.pacientes = res;
    });
  }

  seleccionarPaciente(paciente: any){
    this.pacientesService.dispararEventoPacienteSeleccionado(paciente);
    this.snackbarService.openSnackBarSuccess(labels.paciente_seleccionado, "Cerrar");
  }
}
