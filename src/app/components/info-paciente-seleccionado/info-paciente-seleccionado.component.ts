import { Component, Input, OnInit } from '@angular/core';
import { labels } from '../../constants/labels';

@Component({
  selector: 'app-info-paciente-seleccionado',
  templateUrl: './info-paciente-seleccionado.component.html',
  styleUrls: ['./info-paciente-seleccionado.component.css']
})
export class InfoPacienteSeleccionadoComponent implements OnInit {

  @Input() pacienteSeleccionado: any = null;
  labels: any = labels;

  constructor() { }

  ngOnInit(): void {
  }

}
