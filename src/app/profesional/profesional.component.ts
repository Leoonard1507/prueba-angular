import { Component } from '@angular/core';
import { Trabajador } from '../trabajadores/trabajadores.component';

@Component({
  selector: 'app-trabajador',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css']
})
export class TrabajadorComponent {
  // Crear un objeto de tipo trabajador para guardar el usuario logueado
  trabajador: Trabajador | null = null;

  // Se ejecuta la función al cargar la página
  ngOnInit(): void {
    this.datosProfesional();
  }

  // Función para conseguir el usuario logueado
  datosProfesional(): void {
    // Se consiguen los elementos en forma de string
    const data = localStorage.getItem("usuario_logueado");
    // Si data existe
    if (data) {
      // Se pasa data a objeto
      this.trabajador = JSON.parse(data);
    }
  }

  // Devolver el nombre de las claves del horario
  getDias(obj: any): string[] {
    return Object.keys(obj);
  }
}
