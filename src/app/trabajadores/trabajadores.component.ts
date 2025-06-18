import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Crear una interfaz con los parámetros de los trabajadores
export interface Trabajador {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  foto_url: string;
  servicios_asignados: string[];
  horario: { [dia: string]: string };
  rol: string;
  password: string;
}

// Crear el componente
@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
// Importa OnInit para usar el ciclo de vida del componente
export class TrabajadoresComponent implements OnInit {

  // Array para almacenar los trabajadores cargados desde localStorage
  trabajadores: Trabajador[] = [];
  // Variable para definir por que parámetro se va a filtrar
  tipoFiltro: 'profesional' | 'especialidad' = 'profesional';
  // Variable a la que se le asigna la palabra por la que se busca
  textoFiltro: string = '';

  // Método que se ejecuta automáticamente al iniciar el componente
  ngOnInit() {
    // Intenta obtener la cadena JSON almacenada en localStorage con la clave 'trabajadores'
    const data = localStorage.getItem('trabajadores');

    // Si hay datos, los parsea y los guarda en el array 'trabajadores'; si no, deja el array vacío
    this.trabajadores = data ? JSON.parse(data) : [];
  }

  trabajadoresFiltrados() {
    // Se guarda en texto lo que contiene textoFiltro, limpio y en minúsculas
    const texto = this.textoFiltro.trim().toLowerCase();
    // Si no hay texto que se muestren todos los trabajadores
    if (!texto) return this.trabajadores;


    return this.trabajadores.filter(trabajador => {
      // Se comprueba el tipo de filtro
      if (this.tipoFiltro === 'profesional') {
        // En el caso de ser por profesional devuelve por nombre o por apellido
        return (
          trabajador.nombre.toLowerCase().includes(texto) ||
          trabajador.apellidos.toLowerCase().includes(texto)
        );
      // Si es por especialidad, comprueba si algún servicio incluye el texto de búsqueda
      } else {
        return trabajador.servicios_asignados.some(servicio =>
          servicio.toLowerCase().includes(texto)
        );
      } 
    });
  }
}
