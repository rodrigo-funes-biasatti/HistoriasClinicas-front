import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriasClinicas } from 'src/app/models/historias-clinicas';
import { Paciente } from 'src/app/models/paciente';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { labels } from 'src/app/constants/labels';

@Component({
  selector: 'app-listado-historias-clinicas',
  templateUrl: './listado-historias-clinicas.component.html',
  styleUrls: ['./listado-historias-clinicas.component.css']
})
export class ListadoHistoriasClinicasComponent implements OnInit {

  paciente!: Paciente;
  historias: HistoriasClinicas[] = [];
  mensaje_no_historias = labels.no_historias_clinicas_encontradas;

  constructor(private localStorageService: LocalStorageService,
    private historiaClinicaService: HistoriasClinicasService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerPaciente();
    this.obtenerHistoriasClinicas();
  }

  obtenerPaciente(): void {
    this.paciente = this.localStorageService.getPacienteSeleccionado;
  }

  obtenerHistoriasClinicas(): void {
    this.historiaClinicaService.getHistoriasByIdPaciente(this.paciente.id.toString()).subscribe(res => {
      res.map(h => h.fecha = new Date(h.fecha).toLocaleDateString());
      this.historias = res;
    })
  }

  redirictVerHistoria(nro_historia: any): void { 
    this.router.navigate(['/visualizar-historia-clinica', nro_historia]);
  }

  redirectEditarHistoria(historia: any): void {
    this.localStorageService.clearHistoriaClinicaSeleccionada();
    this.localStorageService.setHistoriaClinicaSeleccionada(historia);
    this.router.navigate(['/formulario-historias-clinicas', 'editar']);
  }

}
