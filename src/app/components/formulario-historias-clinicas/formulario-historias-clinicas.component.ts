import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-historias-clinicas',
  templateUrl: './formulario-historias-clinicas.component.html',
  styleUrls: ['./formulario-historias-clinicas.component.css']
})
export class FormularioHistoriasClinicasComponent implements OnInit {

  titulo: string = 'Historia Clínica'
  formHistoriaClinica!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  inicializarFormulario(): void {
    this.formHistoriaClinica = this.fb.group({
      nro_historia_clinica: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      
    });
  }

}
