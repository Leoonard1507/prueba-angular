import { Component, Input } from '@angular/core';
import { TrabajadorAddEditComponent } from './components/trabajador-add-edit/trabajador-add-edit.component';
import { TrabajadorListComponent } from './components/trabajador-list/trabajador-list.component';
import { Trabajador } from '../trabajadores/trabajadores.component';
import { TrabajadorService } from '../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrearCitaComponent } from '../crear-editar-cita/crear-editar-cita.component';
import { CitaService } from '../services/cita.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CrearCitaComponent, FormsModule, TrabajadorAddEditComponent, TrabajadorListComponent, CommonModule],
  standalone: true
})
export class AdminComponent {
  @Input() trabajadores: Trabajador[] = [];
  mostrarFormulario: boolean = false;
  trabajadorSeleccionado: Trabajador | null = null;
  citaSeleccionada: any = null;
  citas: any[] = [];

  constructor(private trabajadorService: TrabajadorService, private citaService: CitaService) { }
  ngOnInit() {
    this.actualizarLista();
  }

  // Función para obtener todos los trabajadores
  actualizarLista() {
    this.trabajadores = this.trabajadorService.getTrabajadores();
    this.citas = this.citaService.getCitas();
  }

  editarTrabajador(trabajador: Trabajador) {
    this.trabajadorSeleccionado = trabajador;
  }

  cancelarEdicion() {
    this.trabajadorSeleccionado = null;
  }

  // Método para cancelar edición de cita:
  cancelarEdicionCita() {
    this.citaSeleccionada = null;
  }

  eliminarCita(cita: any) {
      this.citaService.eliminarCita(cita.id); // ✅ pásale solo el ID
      this.actualizarLista(); // ✅ refresca la lista
  }

  editarCita(cita: any) {
    this.citaSeleccionada = cita;
  }
}
