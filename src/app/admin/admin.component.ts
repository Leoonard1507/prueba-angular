import { Component } from '@angular/core';
import { TrabajadorAddComponent } from './components/trabajador-add/trabajador-add.component';
import { TrabajadorListComponent } from './components/trabajador-list/trabajador-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [TrabajadorAddComponent, TrabajadorListComponent],
  standalone: true
})
export class AdminComponent {
  
}
