import { Component } from '@angular/core';
import { Trabajador } from '../trabajadores/trabajadores.component';
import { TrabajadorService } from '../services/trabajador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class AdminComponent {
  // Crear un array con elementos de tipo trabajador
  trabajadores: Trabajador[] = [];
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
  
  diasSemana: string[] = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ];

  serviciosInput: string = '';


  // Constructor qu obtienen los servicios de tipo TrabajadorService
  constructor(private trabajadorService: TrabajadorService) {}

  // Función para obtener todos los trabajadpres
  ngOnInit() {
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }

  // Función para agregar un nuevo trabajador
  agregarTrabajador() {
    this.nuevoTrabajador.servicios_asignados = this.serviciosInput.split(',').map(s => s.trim());
    this.trabajadorService.addTrabajador(this.nuevoTrabajador);
    this.trabajadores = this.trabajadorService.getTrabajadores();
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
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }
}
