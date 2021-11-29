import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setPacienteSeleccionado(paciente: any): void {
    let objectString = JSON.stringify(paciente);
    localStorage.setItem("paciente_seleccionado", objectString);
  }

  get getPacienteSeleccionado(): any {
    let stringObject = localStorage.getItem("paciente_seleccionado")!;
    let objectReturn = JSON.parse(stringObject)
    return objectReturn; 
  }

  clearPacienteSeleccionado(): any {
    let old = localStorage.getItem("paciente_seleccionado");
    localStorage.removeItem("paciente_seleccionado");
    return old;
  }
}
