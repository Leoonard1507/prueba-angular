import { Component } from '@angular/core';
import { Trabajador } from '../trabajadores/trabajadores.component';

@Component({
  selector: 'app-trabajador',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css']
})
export class TrabajadorComponent {
  trabajador: Trabajador[] | null = null;

  datosProfesional(): any {
    const data = localStorage.getItem("usuario_logueado");
    return data ? JSON.parse(data) : null;
  }
}

