import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { PacientesService } from 'src/app/services/pacientes.service';
import { labels } from '../../constants/labels';

@Component({
  selector: 'app-info-paciente-seleccionado',
  templateUrl: './info-paciente-seleccionado.component.html',
  styleUrls: ['./info-paciente-seleccionado.component.css']
})
export class InfoPacienteSeleccionadoComponent implements OnInit {

  pacienteSeleccionado: any = null;
  labels: any = labels;

  constructor(private pacientesService: PacientesService) { }

  ngOnInit(): void {
    this.pacientesService.pacienteSeleccionado.subscribe(res => {
      this.pacienteSeleccionado = res as Paciente;
    });
  };

  objetoVacio(obj: any): boolean {
    return Object.keys(obj).length == 0;
  }

}
