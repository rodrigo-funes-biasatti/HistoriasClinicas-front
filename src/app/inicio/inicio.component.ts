import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../services/clima.service';
import { weather_icons } from '../constants/weather-icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  icons_weather = weather_icons
  titulo: string = "Historias Clínicas"
  fechaYHora:string = "xx/xx/xxxx xx:xx";
  clima: any = {
    icono: 0,
    temp: "",
    nombre: "" 
  }

  constructor(private climaService: ClimaService) { }

  ngOnInit(): void {
    this.actualizarFechaHora();
    this.obtenerClima();
  }

  actualizarFechaHora(): void{
    setInterval(() => {
      this.fechaYHora = new Date(Date.now()).toLocaleString();
    }, 1000);
  }

  obtenerClima(): void{
    this.climaService.getClimaZapala().subscribe((response) => {
      this.clima.icono = this.obtenerIconWeather(response.weather[0].id);
      this.clima.temp = Math.round(response.main.temp) + "°C";
      this.clima.nombre = response.name;
    });
  }

  obtenerIconWeather(icon_id: number): string{
    if(icon_id > 200 && icon_id < 600){
      return "cloudy_snowing";
    } else if (icon_id >= 600 && icon_id < 700){
      return "ac_unit";
    } else if (icon_id >= 700 && icon_id < 800){
      return "water";
    } else if (icon_id >= 800) {
      return "sunny";
    }
    return "cloud";
  }
}
