import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { modos } from 'src/app/constants/modos-formulario';
import { HistoriasClinicas } from 'src/app/models/historias-clinicas';
import { Paciente } from 'src/app/models/paciente';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DatePipe } from '@angular/common';

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
  modo_formulario:string = modos.modo_crear;
  historia_seleccionada!: HistoriasClinicas;

  constructor(private fb: FormBuilder,
              private historiasClinicasService: HistoriasClinicasService,
              private localStorageService: LocalStorageService,
              private route: ActivatedRoute,
              private snackBarService: SnackbarService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.setearModoFormulario();

    this.paciente_seleccionado = this.localStorageService.getPacienteSeleccionado;

    switch(this.modo_formulario){
      case modos.modo_crear: this.accionesModoCrear(); break;
      case modos.modo_editar: this.accionesModoEditar(); break;
    }
  }

  setearModoFormulario(): void {
    this.modo_formulario = this.route.snapshot.paramMap.get('modo')!;
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

  accionesModoCrear(): void {
    this.titulo = "Nueva Historia Clínica";
    this.historiasClinicasService.getNextNroHistoria.subscribe((nextNro) => {
      this.nro_historia = nextNro[0].new_id;
      this.setNextNroHistoria(this.nro_historia);
    });
  }

  accionesModoEditar(): void{
    this.titulo = "Editar Historia Clínica";
    this.historia_seleccionada = this.localStorageService.getHistoriaClinicaSeleccionada;
    this.rellenarFormulario();
    this.formHistoriaClinica?.controls['nro_historia_clinica'].disable();
  }

  rellenarFormulario(): void {
    this.formHistoriaClinica?.controls['nro_historia_clinica'].setValue(this.historia_seleccionada.nro_historia);
    this.formHistoriaClinica?.controls['fecha'].setValue(this.historia_seleccionada.fecha);
    this.formHistoriaClinica?.controls['motivo_consulta'].setValue(this.historia_seleccionada.motivo_consulta);
    this.formHistoriaClinica?.controls['indicaciones'].setValue(this.historia_seleccionada.indicaciones);
  }

  setMatLabelNroHistoria(): string {
    return this.modo_formulario === modos.modo_crear ? 'Nro Historia Clinica (Sugerido)' : 'Nro Historia Clinica'
  }

  limpiarCampos(): void{
    this.formHistoriaClinica?.controls['fecha'].setValue('');
    this.formHistoriaClinica?.controls['motivo_consulta'].setValue('');
    this.formHistoriaClinica?.controls['indicaciones'].setValue('');
  }

  rellenarHistoriaGuardar(): any {
    let historia: HistoriasClinicas = {
      nro_historia: this.formHistoriaClinica?.controls['nro_historia_clinica'].value,
      id_paciente: this.paciente_seleccionado.id,
      fecha: new DatePipe("en-US").transform(this.formHistoriaClinica?.controls['fecha'].value, "yyyy-MM-dd")!,
      motivo_consulta: this.formHistoriaClinica.controls['motivo_consulta'].value,
      indicaciones: this.formHistoriaClinica.controls['indicaciones'].value
    }
    return historia;
  }

  rellenarHistoriaEditar(): any {
    let historia: HistoriasClinicas = {
      nro_historia: this.formHistoriaClinica?.controls['nro_historia_clinica'].value,
      id_paciente: 0,
      fecha: new DatePipe("en-US").transform(this.formHistoriaClinica?.controls['fecha'].value, "yyyy-MM-dd")!,
      motivo_consulta: this.formHistoriaClinica.controls['motivo_consulta'].value,
      indicaciones: this.formHistoriaClinica.controls['indicaciones'].value
    }
    return historia;
  }

  crearNuevaHistoria(): void{
    this.historiasClinicasService.createHistoriaClinica(this.rellenarHistoriaGuardar()).subscribe(res => {
      this.snackBarService.openSnackBarSuccess('Se ha creado la Historia Clínica con éxito.', 'Cerrar');
      this.accionesFinalizarCreacion();
    },
    err => {
      this.snackBarService.openSnackBarError('Error al crear la Historia Clínica: ', err.error.message);
    })
  }

  editarHistoria(): void {
    this,this.historiasClinicasService.updateHistoriaClinica(this.rellenarHistoriaEditar()).subscribe(res => {
      this.snackBarService.openSnackBarSuccess('Se ha editado la Historia Clínica con éxito.', 'Cerrar');
      this.accionesFinalizarEdicion();
    },
    err => {
      this.snackBarService.openSnackBarError('Error al editar la Historia Clínica: ', err.error.message);
    });
  }

  guardarCambios(): void {
    console.log(this.modo_formulario);
    switch(this.modo_formulario){
      case modos.modo_crear: this.crearNuevaHistoria(); break;
      case modos.modo_editar: this.editarHistoria(); break;
    }
  }

  accionesFinalizarCreacion(): void {
    this.limpiarCampos();
    this.formHistoriaClinica.markAsUntouched();
    this.historiasClinicasService.getNextNroHistoria.subscribe(nextNro => {
      this.nro_historia = nextNro[0].new_id;
      this.setNextNroHistoria(this.nro_historia);
    })
  }

  accionesFinalizarEdicion(): void {
    this.formHistoriaClinica.markAsUntouched();
  }
}
