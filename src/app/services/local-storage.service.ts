import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setPacienteSeleccionado(paciente: any): void {
    localStorage.setItem("paciente_seleccionado", paciente);
  }

  get getPacienteSeleccionado(): any {
    return localStorage.getItem("paciente_seleccionado"); 
  }

  clearPacienteSeleccionado(): any {
    let old = localStorage.getItem("paciente_seleccionado");
    localStorage.removeItem("paciente_seleccionado");
    return old;
  }
}
