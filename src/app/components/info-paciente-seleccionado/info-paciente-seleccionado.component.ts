import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private pacientesService: PacientesService,
              private router: Router) { }

  ngOnInit(): void {
    this.pacientesService.pacienteSeleccionado.subscribe(res => {
      this.pacienteSeleccionado = res as Paciente;
      window.scroll(0,0);
    });
  };

  objetoVacio(obj: any): boolean {
    return Object.keys(obj).length == 0;
  }

  redirectToFormularioPaciente(){
    this.router.navigate(['/formulario-paciente']);
  }

}
