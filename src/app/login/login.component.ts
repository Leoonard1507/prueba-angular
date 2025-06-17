import { Component } from '@angular/core';
import { InputComponent } from '../shared/input/input.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [InputComponent, RouterModule],
  standalone: true
})
export class LoginComponent {
  title = 'prueba-angular16';
}
