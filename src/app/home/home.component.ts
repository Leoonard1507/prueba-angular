import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Cita {
  id: number;
  cliente_email: string;
  cliente_nombre: string;
  cliente_telefono: string;
  estado: string;
  inicio: string;
  fin: string;
  notas_cliente: string;
  notas_profesional: string;
  servicio: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// Implementa de OnInit para que haga una primera llamada al iniciar la página de lo que quiera cargar nada mas arrancar
export class HomeComponent implements OnInit {
  // Variables
  calendarOptions: CalendarOptions;
  citaForm: FormGroup;
  citas: Cita[] = [];
  mostrarFormulario = false;
  citaTemporal: any = {};
  servicioSeleccionado: any = null;
  horaSeleccionada: string = '';
  fechaSeleccionada: Date | null = null;
  servicios: any[] = [];
  // Buscamos el mayor valor del id de la lista cita 
  maxId = this.citas.reduce((max, cita) => Math.max(max, cita.id), 0);

  constructor(private fb: FormBuilder) {
    // Definir el calendario y sus funcionalidades
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin], // Plugins que usa el calendario
      initialView: 'dayGridMonth', // Vista inicial (mes con días en cuadrícula)
      selectable: true, // Permite seleccionar fechas con el mouse
      selectMirror: true, // Al seleccionar, muestra una sombra del rango
      events: [], // Aquí irán los eventos (citas)
      select: this.handleDateSelect.bind(this), // Función que se llama cuando seleccionas fechas
    };

    // Crear formulario reactivo con validaciones
    this.citaForm = this.fb.group({
      cliente_nombre: ['', [Validators.required, Validators.minLength(2)]],
      cliente_telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      cliente_email: ['', [Validators.email]],
      notas_cliente: [''],
      hora: ['', Validators.required]
    });
  }

  // Al iniciar la página carga las citas y los servicios del localStorage
  ngOnInit(): void {
    // Carar los servicios
    this.servicios = JSON.parse(localStorage.getItem('serviciosDisponibles') || '[]');

    // Cargar las citas ya creadas
    const data = localStorage.getItem('citas');
    // Comprobar si existen citas
    if (data) {
      // Convertir la cadena JSON en un objeto
      this.citas = JSON.parse(data);
      // Crear por cada cita un objeto 
      this.calendarOptions.events = this.citas.map(cita => ({
        title: `${cita.servicio} - ${cita.cliente_nombre}`, // Título del servicio y nombre
        start: cita.inicio, // Fecha de inicio 
        end: cita.fin // Fecha fin
      }));
    }
  }

  // Función para seleccionar el día de la cita
  handleDateSelect(selectInfo: DateSelectArg) {
    // Verificar si hay un servicio seleccionado
    if (!this.servicioSeleccionado) {
      alert('Selecciona un servicio antes de elegir una fecha.');
      return;
    }

    // Guardar la fecha seleccionada para realizar el servicio
    this.fechaSeleccionada = selectInfo.start;
    // Se pone la variable a true para que muestre el modal con el que se realiza la cita
    this.mostrarFormulario = true;
    // Se vacía el formulario 
    this.citaForm.reset();
  }

  // Función para guardar la cita 
  guardarCita() {
    // si el formulario es inválido 
    if (this.citaForm.invalid || !this.fechaSeleccionada) {
      this.citaForm.markAllAsTouched();
      alert('Corrige los errores y completa la fecha y hora.');
      return;
    }

    // Se coge los valores del formulario
    const formValues = this.citaForm.value;
    // Se divide la hora y se guarda cada valor
    const [horas, minutos] = formValues.hora.split(':').map(Number);

    // Se crea una fecha nueva basada en la fecha seleccionada
    const inicio = new Date(this.fechaSeleccionada);
    // Se le asigna las horas, minutos y segundos 
    inicio.setHours(horas, minutos, 0);

    // Se guarda la duración del servicio
    const duracionMin = this.servicioSeleccionado.duracion;
    // Se calcula el fin del servicio
    const fin = new Date(inicio.getTime() + duracionMin * 60000);

    // Comprueba si la nueva cita coincide con otra ya creada, el some() recorre todas las citas y comprueba si una de las comprobaciones coincide si coincide devuelve true
    const solapa = this.citas.some(cita =>
      inicio < new Date(cita.fin) && fin > new Date(cita.inicio)
    );

    // Si esto devuelve true manda un mensaje de error
    if (solapa) {
      alert('Ese hueco ya está ocupado.');
      return;
    }

    // Se crea la nueva cita con todos sus parámetros
    const nuevaCita = {
      id: this.maxId++,
      cliente_nombre: formValues.cliente_nombre,
      cliente_telefono: formValues.cliente_telefono,
      cliente_email: formValues.cliente_email,
      notas_cliente: formValues.notas_cliente,
      notas_profesional: " ",
      estado: 'pendiente',
      servicio: this.servicioSeleccionado.nombre,
      inicio: inicio.toISOString(),
      fin: fin.toISOString()
    };

    // Se añade la nueva cita al array de citas
    this.citas.push(nuevaCita);
    // Guardar el array de citas actualizado en localStorage
    localStorage.setItem('citas', JSON.stringify(this.citas));

    // En el array que tiene los elementos visibles de la tabla agregar un nuevo elemento 
    this.calendarOptions.events = [
      ...(this.calendarOptions.events as any[]),
      {
        title: `${nuevaCita.servicio} - ${nuevaCita.cliente_nombre}`,
        start: nuevaCita.inicio,
        end: nuevaCita.fin
      }
    ];

    // Se vuelve a cerrar el modal
    this.mostrarFormulario = false;
    // Se limpia la fecha seleccionada, el servicio y el formulario
    this.fechaSeleccionada = null;
    this.servicioSeleccionado = null;
    this.citaForm.reset();
  }
}
