import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../models/paciente';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  _pacientes: any[] = []
  url: string = "pacientes/";
  pacienteBuscado: EventEmitter<Paciente> = new EventEmitter();
  public pacientesEncontrados$ = new BehaviorSubject<Paciente[]>(this._pacientes);
  public pacientesEncontrados = this.pacientesEncontrados$.asObservable();

  constructor(private httpClient: HttpClient) { }

  findByNamePatient(nombre: string): Observable<Paciente[]>{
    return this.httpClient.get<Paciente[]>(`${environment.endpoint}${this.url}${nombre}`);
  }

  dispararEventoPacientesEncontrados(pacientes: Paciente[]){
    this.pacientesEncontrados$.next(pacientes);
  }

}
