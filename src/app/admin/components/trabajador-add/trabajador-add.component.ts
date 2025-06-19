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
  // Avisar al componente padre de que ha surgido un evento
  @Output() trabajadorAñadido = new EventEmitter<void>();
  // Crear un elemento de tipo FormGroup
  trabajadorForm: FormGroup;
  // Un array con los días de la semana para posteriormente usarlo al añadir el horario del nuevo usuario
  diasSemana: string[] = [
    'lunes', 
    'martes', 
    'miércoles', 
    'jueves', 
    'viernes', 
    'sábado', 
    'domingo'
  ];
  // Variable con un array que contiene los servicios que puede hacer un trabajador
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
  // Variable que contiene los roles de un trabajador
  rolesDisponibles = ['admin', 'profesional'];

  // Inyectamos FormBuilder para crear el formulario reactivo y TrabajadorService para enviar los datos al backend mediante la función creada
  constructor(private fb: FormBuilder, private trabajadorService: TrabajadorService) {
    // Se crea el formulario con sus validaciones
    this.trabajadorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // 9 dígitos
      foto_url: ['', Validators.required],
      servicios: [[], Validators.required],
      rol: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Se crea otro formulario para los días
      horario: this.fb.group(
        // Se crea un objeto con una clave por cada día
        this.diasSemana.reduce((acc, dia) => {
          // Se crea una entrada en el objeto para cada día inicialmente vacía
          acc[dia] = ['']; 
          // Se devuelve el objeto
          return acc;
        }, {} as { [key: string]: any }) // Indicar el tipo de objeto creado
      )
    });
  }

  // Función para mandar los mensajes de error recogidos en las validaciones, 
  getErrorMessage(controlName: string): string {
    // Recoge eñ mensaje de error de cada campo
    const control = this.trabajadorForm.get(controlName);
    // Comprueba que hay mensaje de error
    if (!control || !control.errors) return '';
    //Si el campo es obligatorio que salga el mensaje
    if (control.errors['required']) return `El campo ${controlName} es obligatorio.`;
    // Cuando el mensaje es de tipo mínimo de caracteres
    if (control.errors['minlength']) {
      return `El campo ${controlName} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`;
    }
    // Cuando es de tipo email
    if (control.errors['email']) return `El email no es válido.`;
    // Para la validación del teléfono
    if (control.errors['pattern']) {
      if (controlName === 'telefono') {
        return 'El teléfono debe tener 9 dígitos numéricos.';
      }
      return `El formato del campo ${controlName} es incorrecto.`;
    }
    return '';
  }

  // Función para agregar el trabajador
  agregarTrabajador() {
    // Comprueba si el formulario tiene un formato inválido
    if (this.trabajadorForm.invalid) {
      // Inicar el error con solo ser tocado y no ser rellenado
      this.trabajadorForm.markAllAsTouched();
      return;
    }

    // Guardar los valores del objeto creado de trabajadoresForm
    const formValues = this.trabajadorForm.value;

    // Crear el nuevo objeto con todos los parámetros del nuevo trabajador
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

    // Llamar a la función para añadir trabajadores y pasarle el nuevo trabajador
    this.trabajadorService.addTrabajador(nuevoTrabajador);
    // Emitir un evento para avisar de que se ha añadido un nuevo trabajador
    this.trabajadorAñadido.emit();
    // Limpiar los campos del formulario
    this.trabajadorForm.reset();
  }
}
