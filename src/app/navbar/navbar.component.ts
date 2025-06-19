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
  // Booleano que confirma si hay o no un usuario logueado
  usuario_logueado: boolean = false;

  // Constructor para el rooter
  constructor(private router: Router) {}

  // Al iniciar la página se ejecuta la función
  ngOnInit(): void {
    this.comprobarUsuario();
  }

  // Comprueba si hay un usuario logueado
  comprobarUsuario(): void {
    const data = localStorage.getItem('usuario_logueado');
    this.usuario_logueado = !!data;
  }

  cerrarSesion(): void {
    // Limpia los datos de la vriable usuario logueado
    localStorage.removeItem('usuario_logueado'); 
    // Redirige al inicio
    this.router.navigate(['/']); 
  }
}
