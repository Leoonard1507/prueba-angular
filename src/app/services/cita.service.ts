import { Injectable } from '@angular/core';
import { Cita } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  // Variables
  localStorageKey = "citas"

  constructor() { }

  //Función para obtener todas las citas 
    getCitas(): Cita[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }
}
