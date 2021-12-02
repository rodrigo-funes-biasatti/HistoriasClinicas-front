import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SpinnerService } from './services/spinner.service';
import { LocalStorageService } from './services/local-storage.service';
import { SnackbarService } from './services/snackbar.service';
import { Router } from '@angular/router';
import { PacientesService } from './services/pacientes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  pacientes: any[] = [];
  paciente: any = null;

  showSpinner: boolean = false;

  constructor(
    public spinnerService: SpinnerService,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackbarService,
    private pacientesService: PacientesService,
    private router: Router) { }

  ngOnInit(): void {
    this.localStorageService.clearPacienteSeleccionado();
  }
  
}
