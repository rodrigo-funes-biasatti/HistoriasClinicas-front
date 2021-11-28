import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.css']
})
export class FormularioPacienteComponent implements OnInit {

  formPaciente!: FormGroup;
  today : string | null = new DatePipe("en-US").transform(new Date(), "dd-MM-yyyy"); 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.today)
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
      direccion: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      telefono: ['', [Validators.minLength(1), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      obra_social: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      fecha_nacimiento: [this.today, [Validators.required]],
      sexo: ['', [Validators.min(0), Validators.max(1)]]
    });
  }

  limpiar_campos(): void{
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

}
