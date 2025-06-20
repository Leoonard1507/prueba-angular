import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../services/cita.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {
  // Mandar una notificacion de que ha surgido un evento
  @Output() citaCreada = new EventEmitter<void>();
  // Mandar una notificacion de que se ha cancelado
  @Output() cancelar = new EventEmitter<void>();
  // Crear una instancia del formulario 
  citaForm: FormGroup;
  // Crear un array para los servicios
  servicios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService
  ) {
    // Crear validaciones para los parámetros
    this.citaForm = this.fb.group({
      cliente_nombre: ['', [Validators.required, Validators.minLength(2)]],
      cliente_telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      cliente_email: ['', [Validators.email]],
      notas_cliente: [''],
      notas_profesional: [''],
      servicio: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  // Cargar los servicios del localStorage
  ngOnInit(): void {
    const data = localStorage.getItem('serviciosDisponibles');
    this.servicios = data ? JSON.parse(data) : [];
  }

  // Guardar la nueva cita
  guardar(): void {
    // Comprueba si el formulario es inválido
    if (this.citaForm.invalid) return;

    // Busca el servicio seleccionado que coincida con el seleccionado
    const servicioSeleccionado = this.servicios.find(
      s => s.nombre === this.citaForm.value.servicio
    );

    // Se le pasa a la funcion creada en service el formulario y la duración del servicio
    this.citaService.crearCitaDesdeTrabajador(
      {
        ...this.citaForm.value,
        duracion: servicioSeleccionado?.duracion
      }
    );

    // Resetea el formulario
    this.citaForm.reset();
    // Notifica al padre
    this.citaCreada.emit(); 
  }
}
