import { Component } from '@angular/core';
import { Trabajador } from '../trabajadores/trabajadores.component';
import { CitaService } from '../services/cita.service';
import { Cita } from '../home/home.component';

@Component({
  selector: 'app-trabajador',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css']
})
export class TrabajadorComponent {
  // Crear un objeto de tipo trabajador para guardar el usuario logueado
  trabajador: Trabajador | null = null;
  // Crear un objeto para guardar las citas filtradas
  citasFiltradas: any[] = [];
  // Crear un booleano que abra o cierre el formulario de crear cita
  mostrarFormulario: boolean = false;

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

  // Función para eliminar una cita
  eliminarCita(cita: Cita) {
    // Pasar el id de la cita que se va a eliminar
    this.citaService.eliminarCita(cita.id);
    this.citas(); 
  }

  // Al crear la cita cierra el formulario y actualiza las citas
  onCitaCreada(): void {
    this.mostrarFormulario = false;
    this.citas();
  }
}
