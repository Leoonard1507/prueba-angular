import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true
})
export class InputComponent {
  @Input() type: string = '';           // Tipo de input (text, password, email...)
  @Input() placeholder: string = '';    // Placeholder para el input
  @Input() value: string = '';          // Valor inicial (para ngModel)
  @Input() label: string = '';          // Añadir el label del input
}
