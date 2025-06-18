import { Component } from '@angular/core';
import { Trabajador } from '../trabajadores/trabajadores.component';
import { TrabajadorService } from '../services/trabajador.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // Crear 
  trabajadores: Trabajador[] = [];

  constructor(private trabajadorService: TrabajadorService) {}

  // Función para obtener todos los trabajadpres
  ngOnInit() {
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }
}
