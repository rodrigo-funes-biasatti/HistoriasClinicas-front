import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoriasClinicas } from 'src/app/models/historias-clinicas';
import { Paciente } from 'src/app/models/paciente';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-visualizar-historia-clinica',
  templateUrl: './visualizar-historia-clinica.component.html',
  styleUrls: ['./visualizar-historia-clinica.component.css']
})
export class VisualizarHistoriaClinicaComponent implements OnInit {

  historia!: HistoriasClinicas;
  paciente!: Paciente;

  constructor(private route: ActivatedRoute,
              private historiaClinicaService: HistoriasClinicasService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.obtenerHistoriaClinica();
    this.obtenerPaciente();
  }

  obtenerHistoriaClinica(): void {
    let nro_historia = this.route.snapshot.paramMap.get('nro')!;
    this.historiaClinicaService.getHistoriaByNroHistoria(nro_historia).subscribe(res => {
      res.map(h => h.fecha = new Date(h.fecha).toLocaleDateString());
      this.historia = res[0];
    });
  }

  obtenerPaciente(): void{
    this.paciente = this.localStorageService.getPacienteSeleccionado;
  }

  calcularEdad(fecha_nacimiento: string): number {
    let diff = Math.abs(Date.now() - new Date(fecha_nacimiento).getTime());
    return Math.floor((diff / (1000*3600*24))/365.25);
  }

}
