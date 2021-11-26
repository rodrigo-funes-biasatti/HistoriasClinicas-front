import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../models/paciente';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  _pacientes: any[] = [];
  paciente: any = {};
  url: string = "pacientes/";

  public pacientesEncontrados$ = new BehaviorSubject<Paciente[]>(this._pacientes);
  public pacientesEncontrados = this.pacientesEncontrados$.asObservable();

  public pacienteSeleccionado$ = new BehaviorSubject<Paciente>(this.paciente);
  public pacienteSeleccionado = this.pacienteSeleccionado$.asObservable();

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService) { }

  findByNamePatient(nombre: string): Observable<Paciente[]>{
    return this.httpClient.get<Paciente[]>(`${environment.endpoint}${this.url}${nombre}`);
  };

  dispararEventoPacientesEncontrados(pacientes: Paciente[]){
    this.pacientesEncontrados$.next(pacientes);
  };

  dispararEventoPacienteSeleccionado(paciente: Paciente){
    this.localStorageService.setPacienteSeleccionado(paciente);
    this.pacienteSeleccionado$.next(paciente);
  }

}
