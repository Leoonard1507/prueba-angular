import { Injectable } from '@angular/core';
import { Cita } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  // Se crea un array para las citas
  citas: Cita[] = [];

  constructor() {}

  // Función para obtener y  devolver las citas
  getCitas(): Cita[] {
    const data = localStorage.getItem('citas');
    this.citas = data ? JSON.parse(data) : [];
    return this.citas;
  }


  // Función para crear la cita
  crearCitaDesdeTrabajador(formData: any, trabajadorId?: string, serviciosDisponibles?: any[]): Cita {
    // Calcular inicio duración y fin del servicio
    const [horas, minutos] = formData.hora.split(':').map(Number);
    const inicio = new Date(formData.fecha);
    inicio.setHours(horas, minutos, 0);
    const duracion = serviciosDisponibles?.find(s => s.nombre === formData.servicio)?.duracion || 30;
    const fin = new Date(inicio.getTime() + duracion * 60000);

    // Crear la cita cogiendo los datos del formdata
    const nuevaCita: Cita = {
      id: crypto.randomUUID(),
      cliente_nombre: formData.cliente_nombre,
      cliente_telefono: formData.cliente_telefono,
      cliente_email: formData.cliente_email,
      notas_cliente: formData.notas_cliente || '',
      notas_profesional: formData.notas_profesional || '',
      estado: 'pendiente',
      servicio: formData.servicio,
      inicio: inicio.toISOString(),
      fin: fin.toISOString(),
      trabajadorId
    };

    // Guardar la nueva cita en el array
    this.citas.push(nuevaCita);
    // Guardar el array en localStorage
    localStorage.setItem('citas', JSON.stringify(this.citas));
    return nuevaCita;
  }

  // Función para eliminar una cita
  eliminarCita(id: string): void {
    this.citas = this.citas.filter(c => c.id !== id);
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }

  // Cargar servicios desde localStorage
  obtenerServicios(): any[] {
    const data = localStorage.getItem('serviciosDisponibles');
    return data ? JSON.parse(data) : [];
  }
}
