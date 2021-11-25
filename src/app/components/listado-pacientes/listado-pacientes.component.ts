import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit {

  pacientes: any = [];

  constructor(private pacientesService: PacientesService) { }

  ngOnInit(): void {
    this.pacientesService.pacientesEncontrados.subscribe(res => {
      this.pacientes = res;
    })
  }

}
