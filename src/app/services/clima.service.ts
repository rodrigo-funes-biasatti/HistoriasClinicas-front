import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  constructor(private httpClient: HttpClient) { }

  getClimaZapala(): Observable<any>{
    return this.httpClient.get<any>("http://api.openweathermap.org/data/2.5/weather?q=" 
      + environment.city_weather_name +"&units=metric&appid=" + environment.weather_api_key);
  }
}
