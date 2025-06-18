import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Crear componente
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, FormsModule, CommonModule],
  standalone: true
})

// Crear la clase
export class LoginComponent {
  // Crear las variables del login
  email: string = '';
  password: string = '';
  error: string = '';

  // Router permite navegar entre las rutas de mi aplicación, 
  // private:router se usa vara redireccionar al usuario en el login
  constructor(private router: Router) { }

  // Crear la función del login
  login() {
    // Obtener la tabla de trabajadores
    const data = localStorage.getItem('trabajadores');
    // Si hay data se parsean, si no hay se devuelve un elemento vacío
    const trabajadores = data ? JSON.parse(data) : [];

    // Buscar las coincidencias entre los datos introducidos y los de la tabla
    const usuario = trabajadores.find(
      (t: any) => t.email === this.email && t.password === this.password
    );

    // Si existe el usuario se le dirige a una ruta según su rol, sino se imprime un error
    if (usuario) {
      if (usuario.rol == "admin") {
        localStorage.setItem('usuario_logueado', JSON.stringify(usuario));
        this.router.navigate(['/admin']);
      } else {
        this.error = 'No tienes permisos para acceder';
      }
    } else {
      this.error = 'Correo o contraseña incorrectos';
    }
  }
}
