import { Injectable } from '@angular/core';
import { Cita } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  // Se crea un array para las citas
  citas: Cita[] = [];

  constructor() { }

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

  // Función para editar una cita desde el trabajador
  editarCitaDesdeTrabajador(formData: any, citaId: string, serviciosDisponibles?: any[]): void {
    // Calcular inicio, duración y fin del servicio
    const duracion = serviciosDisponibles?.find(s => s.nombre === formData.servicio)?.duracion || 30;
    const { inicio, fin } = this.calcularFechas(formData, duracion);

    // Actualizar la cita en el array
    const index = this.citas.findIndex(c => c.id === citaId);
    if (index !== -1) {
      this.citas[index] = {
        ...this.citas[index],
        ...formData,
        inicio,
        fin,
      };

      // Guardar el array actualizado en localStorage
      localStorage.setItem('citas', JSON.stringify(this.citas));
    }
  }

  // Función para calcular las fechas de inicio y fin de una cita
  private calcularFechas(formData: any, duracion: number) {
    // Extraer horas y minutos de la hora proporcionada
    const [horas, minutos] = formData.hora.split(':').map(Number);
    // Crear la fecha de inicio y calcular la fecha de fin
    const inicio = new Date(formData.fecha);
    inicio.setHours(horas, minutos, 0);
    const fin = new Date(inicio.getTime() + duracion * 60000);

    // Devolver las fechas en formato ISO
    return { inicio: inicio.toISOString(), fin: fin.toISOString() };
  }


  // Función para actualizar una cita existente
  actualizarCita(citaActualizada: Cita): void {
    const index = this.citas.findIndex(c => c.id === citaActualizada.id);
    if (index !== -1) {
      this.citas[index] = { ...citaActualizada };
      localStorage.setItem('citas', JSON.stringify(this.citas));
    }
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
