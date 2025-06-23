import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Servicio {
  nombre: string;
  duracion: number;
}

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminServicesComponent implements OnInit {
  servicios: Servicio[] = [];
  servicioEditado: Servicio | null = null;
  nuevaDuracion: number = 0;
  nuevoNombre: string = '';

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    const data = localStorage.getItem('serviciosDisponibles');
    this.servicios = data ? JSON.parse(data) : [];
  }

  agregarServicio() {
    if (this.nuevoNombre.trim() && this.nuevaDuracion > 0) {
      // Evitar duplicados
      if (this.servicios.find(s => s.nombre.toLowerCase() === this.nuevoNombre.trim().toLowerCase())) {
        alert('El servicio ya existe');
        return;
      }
      this.servicios.push({
        nombre: this.nuevoNombre.trim(),
        duracion: this.nuevaDuracion
      });
      this.guardarServicios();
      this.nuevoNombre = '';
      this.nuevaDuracion = 0;
    }
  }

  editarServicio(servicio: Servicio) {
    this.servicioEditado = { ...servicio };
    this.nuevaDuracion = servicio.duracion;
    this.nuevoNombre = servicio.nombre;
  }

  guardarCambios() {
    if (this.servicioEditado) {
      // Actualiza servicio
      this.servicios = this.servicios.map(s => {
        if (s.nombre === this.servicioEditado!.nombre) {
          return { nombre: this.nuevoNombre.trim(), duracion: this.nuevaDuracion };
        }
        return s;
      });
      this.guardarServicios();
      this.cancelarEdicion();
    }
  }

  eliminarServicio(servicio: Servicio) {
    this.servicios = this.servicios.filter(s => s.nombre !== servicio.nombre);
    this.guardarServicios();
  }

  cancelarEdicion() {
    this.servicioEditado = null;
    this.nuevaDuracion = 0;
    this.nuevoNombre = '';
  }

  guardarServicios() {
    localStorage.setItem('serviciosDisponibles', JSON.stringify(this.servicios));
  }
}
