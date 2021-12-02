import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { historias_clinicas_api } from '../constants/endpoints';
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
}
