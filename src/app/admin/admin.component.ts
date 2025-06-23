import { Component, Input } from '@angular/core';
import { TrabajadorAddEditComponent } from './components/trabajador-add-edit/trabajador-add-edit.component';
import { TrabajadorListComponent } from './components/trabajador-list/trabajador-list.component';
import { Trabajador } from '../trabajadores/trabajadores.component';
import { TrabajadorService } from '../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrearCitaComponent } from '../crear-editar-cita/crear-editar-cita.component';
import { CitaService } from '../services/cita.service';
import { AdminServicesComponent } from './components/admin-services/admin-services.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [ AdminServicesComponent, CrearCitaComponent, FormsModule, TrabajadorAddEditComponent, TrabajadorListComponent, CommonModule],
  standalone: true
})
export class AdminComponent {
  @Input() trabajadores: Trabajador[] = [];
  mostrarFormulario: boolean = false;
  trabajadorSeleccionado: Trabajador | null = null;
  citaSeleccionada: any = null;
  citas: any[] = [];
  // Crear un objeto de tipo trabajador para guardar el usuario logueado
  trabajador: Trabajador | null = null;

  constructor(private trabajadorService: TrabajadorService, private citaService: CitaService) { }
  ngOnInit() {
    this.actualizarLista();
    this.datosProfesional();
  }

    // Función para conseguir el usuario logueado
  datosProfesional(): void {
    // Se consiguen los elementos en forma de string
    const data = localStorage.getItem("usuario_logueado");
    // Si data existe
    if (data) {
      // Se pasa data a objeto
      this.trabajador = JSON.parse(data);
    }
  }

  // Devolver el nombre de las claves del horario
  getDias(obj: any): string[] {
    return Object.keys(obj);
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
    this.citaService.eliminarCita(cita.id);
    this.actualizarLista();
  }

  editarCita(cita: any) {
    this.citaSeleccionada = cita;
  }

  cambiarEstadoCita(cita: any, nuevoEstado: string) {
    const citaActualizada = { ...cita, estado: nuevoEstado };
    this.citaService.actualizarCita(citaActualizada);
    this.actualizarLista();
  }

  asignarTrabajador(cita: any, trabajadorId: string | null) {
    const citaActualizada = { ...cita, trabajadorId };
    this.citaService.actualizarCita(citaActualizada);
    this.actualizarLista();
  }

  getTrabajadorNombre(trabajadorId: string | null | undefined): string {
    if (!trabajadorId) {
      return 'No asignado';
    }
    const trabajador = this.trabajadores.find(t => t.id === trabajadorId);
    return trabajador ? trabajador.nombre : 'No asignado';
  }
}
