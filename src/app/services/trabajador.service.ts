import { Injectable } from '@angular/core';
import { Trabajador } from '../trabajadores/trabajadores.component';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private storageKey = 'trabajadores';

  // Función para conseguir los trabajadores
  getTrabajadores(): Trabajador[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}
