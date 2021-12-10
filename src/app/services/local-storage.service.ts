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

  setHistoriaClinicaSeleccionada(historia: any){
    let objectString = JSON.stringify(historia);
    localStorage.setItem("historia_clinica_seleccionada", objectString);
  }

  get getHistoriaClinicaSeleccionada(): any {
    let stringObject = localStorage.getItem("historia_clinica_seleccionada")!;
    let objectReturn = JSON.parse(stringObject);
    return objectReturn;
  }

  clearHistoriaClinicaSeleccionada(): any {
    let old = localStorage.getItem("historia_clinica_seleccionada");
    localStorage.removeItem("historia_clinica_seleccionada");
    return old;
  }
}
