import { Component, EventEmitter, Output, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../services/cita.service';

@Component({
  selector: 'app-crear-editar-cita',
  templateUrl: './crear-editar-cita.component.html',
  styleUrls: ['./crear-editar-cita.component.css']
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
  @Input() citaParaEditar: any = null;

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

  // Función para repintar el modal de editar cita
  ngOnChanges(changes: SimpleChanges) {
    if (changes['citaParaEditar'] && this.citaParaEditar) {
      this.citaForm.patchValue({
        cliente_nombre: this.citaParaEditar.cliente_nombre,
        cliente_telefono: this.citaParaEditar.cliente_telefono,
        cliente_email: this.citaParaEditar.cliente_email,
        notas_cliente: this.citaParaEditar.notas_cliente,
        notas_profesional: this.citaParaEditar.notas_profesional,
        servicio: this.citaParaEditar.servicio,
        fecha: this.citaParaEditar.inicio.split('T')[0],
        hora: this.citaParaEditar.inicio.split('T')[1].substring(0, 5)
      });
    }
  }

  // Cargar los servicios del localStorage
  ngOnInit(): void {
    this.servicios = this.citaService.obtenerServicios();

    if (this.citaParaEditar) {
      // Rellenar el formulario con los datos
      this.citaForm.patchValue({
        ...this.citaParaEditar,
        fecha: this.citaParaEditar.inicio.split('T')[0],  // formato YYYY-MM-DD
        hora: this.citaParaEditar.inicio.split('T')[1].substring(0, 5) // formato HH:mm
      });
    }
  }


  // Guardar la nueva cita
  guardar(): void {
    if (this.citaForm.invalid) return;

    // Validar que el servicio seleccionado existe
    const servicioSeleccionado = this.servicios.find(
      s => s.nombre === this.citaForm.value.servicio
    );

    // Crear un formdata con los valores del formulario y la duración del servicio
    const formData = {
      ...this.citaForm.value,
      duracion: servicioSeleccionado?.duracion
    };

    // Si la cita es para editar, se llama a la función de editar cita, si no, se crea una nueva cita
    if (this.citaParaEditar) {
      this.citaService.editarCitaDesdeTrabajador(formData, this.citaParaEditar.id, this.servicios);
    } else {
      this.citaService.crearCitaDesdeTrabajador(formData, undefined, this.servicios);
    }

    // Resetear el formulario y emitir el evento de cita creada
    this.citaForm.reset();
    this.citaCreada.emit();
  }

}
