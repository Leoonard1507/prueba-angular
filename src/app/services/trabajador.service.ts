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

  // Función para añadir un trabajador
  addTrabajador(trabajador: Trabajador): void {
    const trabajadores = this.getTrabajadores();
    trabajadores.push(trabajador);
    localStorage.setItem(this.storageKey, JSON.stringify(trabajadores));
  }

  // Función para eliminar un trabajador
  deleteTrabajador(index: number): void {
    const trabajadores = this.getTrabajadores();
    trabajadores.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(trabajadores));
  }

  // Función para actualizar un trabajador
  updateTrabajador(updatedTrabajador: Trabajador): void {
    const trabajadores = this.getTrabajadores();
    const index = trabajadores.findIndex(t => t.id === updatedTrabajador.id);
    if (index !== -1) {
      trabajadores[index] = updatedTrabajador;
      localStorage.setItem(this.storageKey, JSON.stringify(trabajadores));
    }
  }

}
