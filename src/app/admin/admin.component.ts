import { Component, Input } from '@angular/core';
import { TrabajadorAddComponent } from './components/trabajador-add/trabajador-add.component';
import { TrabajadorListComponent } from './components/trabajador-list/trabajador-list.component';
import { Trabajador } from '../trabajadores/trabajadores.component';
import { TrabajadorService } from '../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [    FormsModule, TrabajadorAddComponent, TrabajadorListComponent, CommonModule],
  standalone: true
})
export class AdminComponent {
  @Input() trabajadores: Trabajador[] = [];
  mostrarFormulario: boolean = false;

  constructor(private trabajadorService: TrabajadorService) { }

  actualizarLista() {
    this.trabajadores = this.trabajadorService.getTrabajadores();
  }
}
