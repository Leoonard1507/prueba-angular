import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Trabajador } from './trabajadores/trabajadores.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarNavbar = true;

  // Función para ocultar el navbar en ciertas rutas
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Oculta el navbar en las rutas donde no quieras mostrarlo
        const rutasSinNavbar = ['/login'];
        this.mostrarNavbar = !rutasSinNavbar.includes(event.urlAfterRedirects);
      }
    });
  }

  // Función para que al iniciar me cree las tablas si no están creadas
  ngOnInit() {
    this.inicializarServicios();
    this.inicializarTrabajadorAdmin();
  }

  // Función que comprueba si existe el localStorage de servicios y si no, lo crea
  inicializarServicios() {
    if (!localStorage.getItem('serviciosDisponibles')) {
      const serviciosDisponibles = [
        { nombre: "Administrador", duracion: 0 },
        { nombre: "Cambio de aceite", duracion: 30 },
        { nombre: "Revisión general", duracion: 60 },
        { nombre: "Cambio de frenos", duracion: 90 },
        { nombre: "Alineación y balanceo", duracion: 120 },
        { nombre: "Reparación de motor", duracion: 150 },
        { nombre: "Mantenimiento general", duracion: 180 },
        { nombre: "Diagnóstico electrónico", duracion: 210 },
        { nombre: "Cambio de neumáticos", duracion: 240 },
        { nombre: "Reparación de transmisión", duracion: 270 },
        { nombre: "Servicio de suspensión", duracion: 300 },
        { nombre: "Revisión de aire acondicionado", duracion: 330 }
      ];
      localStorage.setItem('serviciosDisponibles', JSON.stringify(serviciosDisponibles));
    }
  }

  // Función que comprueba si existe el localStorage de trabajadores y si no, crea un administrador por defecto
  inicializarTrabajadorAdmin() {
    if (!localStorage.getItem('trabajadores')) {
      const trabajador: Trabajador = {
        id: '1',
        nombre: 'admin',
        apellidos: 'admin',
        email: 'admin@gmail.com',
        telefono: '632547898',
        foto_url: 'https://www.creativefabrica.com/wp-content/uploads/2022/10/25/Support-Admin-icon-Graphics-43209390-1.jpg',
        servicios_asignados: [],
        horario: {},
        rol: 'admin',
        password: '123456'
      };
      localStorage.setItem('trabajadores', JSON.stringify([trabajador]));
    }
  }
}
