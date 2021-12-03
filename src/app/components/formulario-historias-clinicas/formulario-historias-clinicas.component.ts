import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-formulario-historias-clinicas',
  templateUrl: './formulario-historias-clinicas.component.html',
  styleUrls: ['./formulario-historias-clinicas.component.css']
})
export class FormularioHistoriasClinicasComponent implements OnInit {

  titulo: string = 'Historia Clínica'
  formHistoriaClinica!: FormGroup;
  paciente_seleccionado!: Paciente;
  nro_historia: string = '0';

  constructor(private fb: FormBuilder,
              private pacienteService: PacientesService,
              private historiasClinicasService: HistoriasClinicasService) { }

  ngOnInit(): void {
    this.pacienteService.pacienteSeleccionado.subscribe((paciente) => {
      this.paciente_seleccionado = paciente;
    });

    this.historiasClinicasService.getNextNroHistoria.subscribe((nextNro) => {
      console.log(nextNro);
      this.nro_historia = nextNro[0].new_id;
      this.setNextNroHistoria(this.nro_historia);
    });

    this.inicializarFormulario();
    this.formHistoriaClinica.controls['fecha'].setValue(Date.now().toString());
  }

  inicializarFormulario(): void {
    this.formHistoriaClinica = this.fb.group({
      nro_historia_clinica: ['', [Validators.required,  Validators.pattern("^[0-9]*$")]],
      fecha: ['', [Validators.required]],
      motivo_consulta: ['', [Validators.required, Validators.maxLength(1000)]],
      indicaciones: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  setNextNroHistoria(value: string): void {
    this.formHistoriaClinica.controls['nro_historia_clinica'].setValue(value);
  }
}
