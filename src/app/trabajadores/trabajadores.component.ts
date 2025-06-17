import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Crear una interfaz con los parámetros de los trabajadores
interface Trabajador {
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
  imports: [CommonModule],
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
// Importa OnInit para usar el ciclo de vida del componente
export class TrabajadoresComponent implements OnInit {

  // Array para almacenar los trabajadores cargados desde localStorage
  trabajadores: Trabajador[] = [];

  // Método que se ejecuta automáticamente al iniciar el componente
  ngOnInit() {
    // Intenta obtener la cadena JSON almacenada en localStorage con la clave 'trabajadores'
    const data = localStorage.getItem('trabajadores');

    // Si hay datos, los parsea y los guarda en el array 'trabajadores'; si no, deja el array vacío
    this.trabajadores = data ? JSON.parse(data) : [];
  }
}
