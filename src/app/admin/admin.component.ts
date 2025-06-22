import { Component, Input } from '@angular/core';
import { TrabajadorAddEditComponent } from './components/trabajador-add-edit/trabajador-add-edit.component';
import { TrabajadorListComponent } from './components/trabajador-list/trabajador-list.component';
import { Trabajador } from '../trabajadores/trabajadores.component';
import { TrabajadorService } from '../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [FormsModule, TrabajadorAddEditComponent, TrabajadorListComponent, CommonModule],
  standalone: true
})
export class AdminComponent {
  @Input() trabajadores: Trabajador[] = [];
  mostrarFormulario: boolean = false;
  trabajadorSeleccionado: Trabajador | null = null;

  constructor(private trabajadorService: TrabajadorService) { }

  // Función para obtener todos los trabajadores
  actualizarLista() {
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }

  editarTrabajador(trabajador: Trabajador) {
    this.trabajadorSeleccionado = trabajador;
  }

  cancelarEdicion() {
    this.trabajadorSeleccionado = null;
  }
}
