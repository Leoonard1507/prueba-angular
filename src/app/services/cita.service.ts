import { Injectable } from '@angular/core';
import { Cita } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  // Variables
  localStorageKey = "citas"

  constructor() { }

  // Función para obtener todas las citas 
  getCitas(): Cita[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  // Función para eliminar citas
  eliminarCita(id: string){
    // Se crea otro array en el que no va a estar el id pasado de la cita que se va a borrar
    const citas = this.getCitas().filter(c => c.id !== id);
    // Se pasa a string y se sube al localSotrage
    localStorage.setItem(this.localStorageKey, JSON.stringify(citas));
  }
}
