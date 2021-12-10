import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { modos } from 'src/app/constants/modos-formulario';
import { Paciente } from 'src/app/models/paciente';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.css']
})
export class FormularioPacienteComponent implements OnInit {

  formPaciente!: FormGroup;
  today: string | null = new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy");
  titulo: string = '';
  paciente!: Paciente;
  modo_formulario: string = modos.modo_crear;

  constructor(private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private pacienteService: PacientesService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.setearModoFormulario();

    if(this.modo_formulario === modos.modo_crear){
      this.accionesModoCrear();
    }
    else{
      this.paciente = this.localStorageService.getPacienteSeleccionado;
      this.paciente ?  
        this.accionesModoEditar() : 
        this.accionesModoCrear();
    }
  }

  accionesModoCrear(): void {
    this.limpiar_campos();
    this.titulo = 'Nuevo Paciente';
  }

  accionesModoEditar(): void {
    this.rellenarFormularioPacienteSeleccionado();
    this.titulo = 'Editar Paciente';
  }

  inicializarFormulario(): void {
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
      direccion: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      telefono: ['', [Validators.minLength(1), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      obra_social: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      fecha_nacimiento: [this.today, [Validators.required]],
      sexo: ['', [Validators.required, Validators.min(0), Validators.max(1)]]
    });
  }

  limpiar_campos(): void {
    this.formPaciente?.controls['nombre'].setValue('');
    this.formPaciente?.controls['apellido'].setValue('');
    this.formPaciente?.controls['dni'].setValue('');
    this.formPaciente?.controls['direccion'].setValue('');
    this.formPaciente?.controls['telefono'].setValue('');
    this.formPaciente?.controls['obra_social'].setValue('');
    this.formPaciente?.controls['fecha_nacimiento'].setValue(Date.now().toString());
    this.formPaciente?.controls['sexo'].setValue('');
    this.formPaciente.markAsUntouched();
  }

  setearModoFormulario(): void {
    this.modo_formulario = this.route.snapshot.paramMap.get('modo')!;
  }

  rellenarFormularioPacienteSeleccionado(): void {
    this.formPaciente?.controls['nombre'].setValue(this.paciente.nombre);
    this.formPaciente?.controls['apellido'].setValue(this.paciente.apellido);
    this.formPaciente?.controls['dni'].setValue(this.paciente.dni);
    this.formPaciente?.controls['direccion'].setValue(this.paciente.direccion);
    this.formPaciente?.controls['telefono'].setValue(this.paciente.telefono);
    this.formPaciente?.controls['obra_social'].setValue(this.paciente.obra_social);
    this.formPaciente?.controls['fecha_nacimiento'].setValue(this.paciente.fecha_nacimiento);
    this.formPaciente?.controls['sexo'].setValue(this.paciente.sexo);
  }

  rellenarPacienteFormulario(): Paciente {
    let paciente: Paciente = {
      id: 0,
      nombre: this.formPaciente?.controls['nombre'].value,
      apellido: this.formPaciente?.controls['apellido'].value,
      dni: this.formPaciente?.controls['dni'].value,
      direccion: this.formPaciente?.controls['direccion'].value,
      telefono: this.formPaciente?.controls['telefono'].value,
      obra_social: this.formPaciente?.controls['obra_social'].value,
      fecha_nacimiento: new DatePipe("en-US").transform(this.formPaciente?.controls['fecha_nacimiento'].value, "yyyy-MM-dd")!,
      sexo: this.formPaciente?.controls['sexo'].value
    };

    return paciente;
  }

  crearPaciente(): void {
    if (this.formPaciente.valid) {
      let pacienteGuardar: Paciente = this.rellenarPacienteFormulario();
      this.pacienteService.createPaciente(pacienteGuardar).subscribe(() => {
        this.snackbarService.openSnackBarSuccess("Se guardó el paciente con éxito!", "Cerrar");
        this.pacienteService.dispararEventoPacienteSeleccionado(pacienteGuardar);
      },
        (err) => {
          console.log(err.error.message)
          this.snackbarService.openSnackBarError('Hubo un error en el servidor: ' + err.message, "Cerrar");
        })
    }
    else{
      this.formPaciente.markAllAsTouched();
    }
  }

  editarPaciente(): void {
    if (this.formPaciente.valid) {
      let pacienteGuardar: Paciente = this.rellenarPacienteFormulario();
      pacienteGuardar.id = this.paciente.id;
      this.pacienteService.updatePatient(pacienteGuardar).subscribe(() => {
        this.snackbarService.openSnackBarSuccess("Se actualizó el paciente con éxito!", "Cerrar");
        this.pacienteService.dispararEventoPacienteSeleccionado(pacienteGuardar);
      },
        (err) => {
          this.snackbarService.openSnackBarError('Hubo un error en el servidor: ' + err.message, "Cerrar");
        })
    }
    else{
      this.formPaciente.markAllAsTouched();
    }
  }

  guardarCambios(): void{
    switch(this.modo_formulario){
      case modos.modo_crear: this.crearPaciente(); break;
      case modos.modo_editar: this.editarPaciente(); break;
    }
  }
}
