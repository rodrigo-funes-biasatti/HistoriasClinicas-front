import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { labels } from 'src/app/constants/labels';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-buscador-inicio',
  templateUrl: './buscador-inicio.component.html',
  styleUrls: ['./buscador-inicio.component.css']
})
export class BuscadorInicioComponent implements OnInit {

  labels: any = {
    titulo: labels.titulo,
    buscar_paciente: labels.buscar_paciente
  }
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  formSearcher = new FormControl();

  showSpinner: boolean = false; 

  constructor(
    public spinnerService: SpinnerService) { }


  ngOnInit(): void {
  }

}
