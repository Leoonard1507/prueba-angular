import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/trabajadores/trabajadores.component';

@Component({
  selector: 'app-trabajador-add',
  templateUrl: './trabajador-add.component.html',
  styleUrls: ['./trabajador-add.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TrabajadorAddComponent {
// Crear un array con elementos de tipo trabajador
  trabajadores: Trabajador[] = [];
  //Crear un objeto con los parámetros de los nuevos trabajadores
  nuevoTrabajador: Trabajador = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    foto_url: '',
    servicios_asignados: [],
    horario: {},
    rol: '',
    password: ''
  };
  // Variable con los días de la semana para mostrarlos en el formulario
  diasSemana: string[] = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ];
  // Variable para guardar los servicios asignados como string para posteriormente dividirlos
  serviciosInput: string = '';

  // Constructor qu obtienen los servicios de tipo TrabajadorService
  constructor(private trabajadorService: TrabajadorService) {}


  // Función para agregar un nuevo trabajador
  agregarTrabajador() {
    // Dividir los servicios asignados por comas y eliminar los espacios en blando
    this.nuevoTrabajador.servicios_asignados = this.serviciosInput.split(',').map(s => s.trim());
    // Añadir el trabajador mediante la función creada en service
    this.trabajadorService.addTrabajador(this.nuevoTrabajador);
    // Limpiar los campos del formulario
    this.nuevoTrabajador = {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      foto_url: '',
      servicios_asignados: [],
      horario: {},
      rol: '',
      password: ''
    };
    // Obtener otra vez los trabajadores actualizados
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }
}
