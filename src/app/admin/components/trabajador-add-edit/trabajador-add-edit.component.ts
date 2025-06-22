import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import type { Trabajador } from 'src/app/trabajadores/trabajadores.component';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-trabajador-add-edit',
  templateUrl: './trabajador-add-edit.component.html',
  styleUrls: ['./trabajador-add-edit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export class TrabajadorAddEditComponent {
  // Avisar al componente padre de que ha surgido un evento
  @Output() trabajadorGuardado = new EventEmitter<void>();
  // Recibir un trabajador para editar, si no se recibe, será null
  @Input() trabajadorParaEditar?: Trabajador | null;
  // Avisar al componente padre de que se ha cancelado la edición
  @Output() edicionCancelada = new EventEmitter<void>();
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
  // Variable para guardar los servicios disponibles
  serviciosDisponibles: string[] = [];
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

    // Asignar el resultado devuelto por la funcion a serviciosDisponibles
    this.serviciosDisponibles = this.getServiciosTrabajador();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.trabajadorParaEditar) {
      this.trabajadorForm.patchValue({
        nombre: this.trabajadorParaEditar.nombre,
        apellidos: this.trabajadorParaEditar.apellidos,
        email: this.trabajadorParaEditar.email,
        telefono: this.trabajadorParaEditar.telefono,
        foto_url: this.trabajadorParaEditar.foto_url,
        servicios: this.trabajadorParaEditar.servicios_asignados,
        rol: this.trabajadorParaEditar.rol,
        password: '',
        horario: this.trabajadorParaEditar.horario || {}
      });
    } else if (changes['trabajadorParaEditar'] && !this.trabajadorParaEditar) {
      this.trabajadorForm.reset();
    }
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
  guardarTrabajador() {
    if (this.trabajadorForm.invalid) {
      this.trabajadorForm.markAllAsTouched();
      return;
    }

    const formValues = this.trabajadorForm.value;

    if (this.trabajadorParaEditar) {
      // Editar
      const updatedTrabajador: Trabajador = {
        ...this.trabajadorParaEditar,
        nombre: formValues.nombre,
        apellidos: formValues.apellidos,
        email: formValues.email,
        telefono: formValues.telefono,
        foto_url: formValues.foto_url,
        servicios_asignados: formValues.servicios,
        rol: formValues.rol,
        password: formValues.password || this.trabajadorParaEditar.password,
        horario: formValues.horario,
      };
      this.trabajadorService.updateTrabajador(updatedTrabajador);
    } else {
      // Crear
      const nuevoTrabajador: Trabajador = {
        id: crypto.randomUUID(),
        nombre: formValues.nombre,
        apellidos: formValues.apellidos,
        email: formValues.email,
        telefono: formValues.telefono,
        foto_url: formValues.foto_url,
        servicios_asignados: formValues.servicios,
        rol: formValues.rol,
        password: formValues.password,
        horario: formValues.horario,
      };
      this.trabajadorService.addTrabajador(nuevoTrabajador);
    }

    this.trabajadorGuardado.emit();
    this.trabajadorForm.reset();
    this.trabajadorParaEditar = null;
  }

  // Función para cancelar la edición
  cancelarEdicion() {
    this.trabajadorForm.reset();
    this.trabajadorParaEditar = null; // localmente, aunque el padre también debe limpiar
    this.edicionCancelada.emit(); // avisar al padre
  }


  // Función para obtener los servicios que puede realizar un trabajador
  getServiciosTrabajador(): string[] {
    // Obtener los servicios disponibles 
    const data = localStorage.getItem('serviciosDisponibles');
    // Convertirlos a objetos
    const serviciosDisponibles = data ? JSON.parse(data) : [];
    // Devolver solo el nombre de los servicios
    return serviciosDisponibles.map((servicio: any) => servicio.nombre);
  }
}
