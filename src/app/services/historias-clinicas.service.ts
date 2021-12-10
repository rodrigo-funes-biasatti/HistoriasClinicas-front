import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { historias_clinicas_api } from '../constants/endpoints';
import { HistoriasClinicas } from '../models/historias-clinicas';
import { Response_Next_Id } from '../models/response-next-id';

@Injectable({
  providedIn: 'root'
})
export class HistoriasClinicasService {

  url: string = "historias_clinicas/";

  constructor(private httpClient: HttpClient) { }

  get getNextNroHistoria(){
    return this.httpClient.get<Response_Next_Id[]>(`${environment.endpoint}${this.url}${historias_clinicas_api.getNextNroHistoria}`);
  }

  getHistoriasByIdPaciente(id_paciente: string) {
    return this.httpClient.get<HistoriasClinicas[]>(`${environment.endpoint}${this.url}${historias_clinicas_api.getByIdPaciente}${id_paciente}`);
  }

  getHistoriaByNroHistoria(nro_historia: string){
    return this.httpClient.get<HistoriasClinicas[]>(`${environment.endpoint}${this.url}${historias_clinicas_api.getByNroHistoria}${nro_historia}`);
  }

  createHistoriaClinica(historia: any){
    return this.httpClient.post(`${environment.endpoint}${this.url}${historias_clinicas_api.create}`, historia);
  }

  updateHistoriaClinica(historia: any){
    return this.httpClient.put(`${environment.endpoint}${this.url}${historias_clinicas_api.update}`, historia);
  }
}
