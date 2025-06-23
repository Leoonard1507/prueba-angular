import { Component } from '@angular/core';
import { Trabajador } from '../trabajadores/trabajadores.component';
import { CitaService } from '../services/cita.service';
import { Cita } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { CrearCitaComponent } from '../crear-editar-cita/crear-editar-cita.component';

@Component({
  selector: 'app-trabajador',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css'],
  standalone: true,
  imports: [CommonModule, CrearCitaComponent]
})
export class TrabajadorComponent {
  // Crear un objeto de tipo trabajador para guardar el usuario logueado
  trabajador: Trabajador | null = null;
  // Crear un objeto para guardar las citas filtradas
  citasFiltradas: any[] = [];
  // Crear un booleano que abra o cierre el formulario de crear cita
  mostrarFormulario: boolean = false;
  // Crear una variable para editar la cita
  citaParaEditar: Cita | null = null;

  constructor(private citaService: CitaService) { }

  // Se ejecuta la función al cargar la página
  ngOnInit(): void {
    this.datosProfesional();
    this.citas();
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

  // Función para obtener las citas 
  citas(): void {
    // Conseguir el array de citas desde cita.sevices
    const citas = this.citaService.getCitas();

    // Filtrar las citas y en las que coincida el servicio con los que presta el mecánico que las muestre
    this.citasFiltradas = citas.filter((cita: Cita) =>
      this.trabajador?.servicios_asignados.includes(cita.servicio)
    );
  }

  // Función para crear una nueva cita
  editarCita(cita: Cita): void {
    // Asignar la cita a editar y mostrar el formulario
    this.citaParaEditar = cita;
    // Mostrar el formulario para editar la cita
    this.mostrarFormulario = true;
  }

  // Función para eliminar una cita
  eliminarCita(cita: Cita) {
    // Pasar el id de la cita que se va a eliminar
    this.citaService.eliminarCita(cita.id);
    this.citas();
  }

  // Al crear la cita cierra el formulario y actualiza las citas
  onCitaCreada(): void {
    this.mostrarFormulario = false;
    this.citaParaEditar = null;
    this.citas();
  }

  // Función para asignar una cita al trabajador
  asignarmeCita(cita: Cita): void {
    if (!this.trabajador) return;

    // A citaEditada se le pasa el objeto cita y se le añade el id del trabajador
    const citaEditada = {
      ...cita,
      trabajadorId: this.trabajador.id
    };
    // Se llama al servicio para actualizar la cita
    this.citaService.actualizarCita(citaEditada);
    // Refresca la lista
    this.citas();
  }

  // Función para cambiar el estado de una cita
  cambiarEstadoCita(cita: any, nuevoEstado: string) {
    const citaActualizada = { ...cita, estado: nuevoEstado };
    this.citaService.actualizarCita(citaActualizada);
    this.citas();
  }
}
