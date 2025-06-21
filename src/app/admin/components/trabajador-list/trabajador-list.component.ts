import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() trabajadores: Trabajador[] = [];
  trabajadorParaEditar: Trabajador | null = null;
  mostrarFormulario: boolean = false;
  servicios: string[] = [];


  // Constructor qu obtienen los servicios de tipo TrabajadorService
  constructor(private trabajadorService: TrabajadorService) { }

  // Función para obtener todos los trabajadpres
  ngOnInit() {
    this.trabajadores = this.trabajadorService.getTrabajadores();
    this.servicios = this.getServiciosTrabajador();

  }

  // Función para eliminar un trabajador, se le pasa la posición del elemento a eliminar
  eliminarTrabajador(index: number) {
    // Se llama a la función y se borra la posición(index)
    this.trabajadorService.deleteTrabajador(index);
    // Se obtienen los trabajadores actualizados
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }

  serviciosTemp: string = '';
  horarioTemp: string = '';

  editarTrabajador(trabajador: Trabajador) {
    this.trabajadorParaEditar = { ...trabajador };
    this.serviciosTemp = trabajador.servicios_asignados.join(', ');
    this.horarioTemp = JSON.stringify(trabajador.horario, null, 2);
    this.mostrarFormulario = true;
  }

  actualizarServicios() {
    if (this.trabajadorParaEditar) {
      this.trabajadorParaEditar.servicios_asignados = this.serviciosTemp.split(',').map(s => s.trim());
    }
  }

  actualizarHorario() {
    if (this.trabajadorParaEditar) {
      try {
        this.trabajadorParaEditar.horario = JSON.parse(this.horarioTemp);
      } catch (e) {
        console.error('Formato JSON inválido en el horario');
      }
    }
  }


  guardarCambios(): void {
    if (this.trabajadorParaEditar) {
      this.trabajadorService.updateTrabajador(this.trabajadorParaEditar);
      this.trabajadorParaEditar = null;
      this.mostrarFormulario = false;
      this.trabajadores = this.trabajadorService.getTrabajadores(); // refrescar lista
    }
  }

  cancelarEdicion() {
    this.trabajadorParaEditar = null;
    this.mostrarFormulario = false;
  }

  getServiciosTrabajador(): string[] {
    const data = localStorage.getItem('serviciosDisponibles');
    const serviciosDisponibles = data ? JSON.parse(data) : [];
    return serviciosDisponibles.map((servicio: any) => servicio.nombre);
  }
}
