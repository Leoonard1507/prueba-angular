import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   mostrarNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Oculta el navbar en las rutas donde no quieras mostrarlo
        const rutasSinNavbar = ['/login'];
        this.mostrarNavbar = !rutasSinNavbar.includes(event.urlAfterRedirects);
      }
    });
  }
}
