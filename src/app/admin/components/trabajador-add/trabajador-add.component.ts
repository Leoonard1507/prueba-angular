import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/trabajadores/trabajadores.component';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-trabajador-add',
  templateUrl: './trabajador-add.component.html',
  styleUrls: ['./trabajador-add.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class TrabajadorAddComponent {
  @Output() trabajadorAñadido = new EventEmitter<void>();

  trabajadorForm: FormGroup;

  diasSemana: string[] = [
    'lunes', 
    'martes', 
    'miércoles', 
    'jueves', 
    'viernes', 
    'sábado', 
    'domingo'
  ];

  serviciosDisponibles = [
    'Cambio de aceite',
    'Revisión de frenos',
    'Alineación y balanceo',
    'Reparación de motor',
    'Mantenimiento general',
    'Diagnóstico electrónico',
    'Cambio de neumáticos',
    'Reparación de transmisión',
    'Servicio de suspensión',
    'Revisión de aire acondicionado'
  ];
  rolesDisponibles = ['admin', 'profesional'];

  constructor(private fb: FormBuilder, private trabajadorService: TrabajadorService) {
    this.trabajadorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // 9 dígitos
      foto_url: ['', Validators.required],
      servicios: [[], Validators.required],
      rol: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      horario: this.fb.group(
        this.diasSemana.reduce((acc, dia) => {
          acc[dia] = ['']; // sin validación, puedes agregar si quieres
          return acc;
        }, {} as { [key: string]: any })
      )
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.trabajadorForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `El campo ${controlName} es obligatorio.`;

    if (control.errors['minlength']) {
      return `El campo ${controlName} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`;
    }

    if (control.errors['email']) return `El email no es válido.`;

    if (control.errors['pattern']) {
      if (controlName === 'telefono') {
        return 'El teléfono debe tener 9 dígitos numéricos.';
      }
      return `El formato del campo ${controlName} es incorrecto.`;
    }

    return '';
  }

  agregarTrabajador() {
    if (this.trabajadorForm.invalid) {
      this.trabajadorForm.markAllAsTouched();
      return;
    }

    const formValues = this.trabajadorForm.value;

    const nuevoTrabajador: Trabajador = {
      nombre: formValues.nombre,
      apellidos: formValues.apellidos,
      email: formValues.email,
      telefono: formValues.telefono,
      foto_url: formValues.foto_url,
      servicios_asignados: formValues.servicios,
      horario: formValues.horario,
      rol: formValues.rol,
      password: formValues.password,
    };

    this.trabajadorService.addTrabajador(nuevoTrabajador);
    this.trabajadorAñadido.emit();
    this.trabajadorForm.reset();
  }
}
