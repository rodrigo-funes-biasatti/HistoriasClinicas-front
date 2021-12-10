import { Component, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { labels } from '../../constants/labels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-flotante',
  templateUrl: './boton-flotante.component.html',
  styleUrls: ['./boton-flotante.component.css'],
  animations: speedDialFabAnimations
})
export class BotonFlotanteComponent implements OnInit {

  fabTogglerState = 'inactive';
  buttons: any = [];
  fabButtons = [
    {
      icon: 'person_add',
      color: 'warn',
      tooltip: labels.tooltip_agregar_paciente,
      redirectTo: 'formulario-paciente/crear'
    },
    {
      icon: 'post_add',
      color: 'warn',
      tooltip: labels.tootip_agregar_historia_clinica,
      redirectTo: 'formulario-historias-clinicas/crear'
    },
    {
      icon: 'search',
      color: 'warn',
      tooltip: labels.tooltip_buscar_paciente,
      redirectTo: 'buscar'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  redirectTo(url: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([url]);
  } 
}
