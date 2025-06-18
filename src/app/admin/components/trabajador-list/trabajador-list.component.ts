import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/trabajadores/trabajadores.component';

@Component({
  selector: 'app-trabajador-list',
  templateUrl: './trabajador-list.component.html',
  styleUrls: ['./trabajador-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})

export class TrabajadorListComponent {
  // Crear un array con los días de la semana para después imprimirlos en la lista de trabajadores
  diasSemana: string[] = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ];
  // Crear un array con elementos de tipo trabajador
  trabajadores: Trabajador[] = [];

  // Constructor qu obtienen los servicios de tipo TrabajadorService
  constructor(private trabajadorService: TrabajadorService) { }

  // Función para obtener todos los trabajadpres
  ngOnInit() {
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }

  // Función para eliminar un trabajador, se le pasa la posición del elemento a eliminar
  eliminarTrabajador(index: number) {
    // Se llama a la función y se borra la posición(index)
    this.trabajadorService.deleteTrabajador(index);
    // Se obtienen los trabajadores actualizados
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }
}
