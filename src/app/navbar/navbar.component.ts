import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Crear el componente
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

// Crear la clase
export class NavbarComponent {

  constructor(private router: Router) {}

  cerrarSesion(): void {
    // Limpia los datos de la vriable usuario logueado
    localStorage.removeItem('usuario_logueado'); 
    // Redirige al inicio
    this.router.navigate(['/']); 
  }
}
