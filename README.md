## Descripción
Taller LCARS - Gestión de Citas y Trabajadores
Descripción
Este proyecto es una aplicación web desarrollada en Angular para la gestión de un taller mecánico llamado LCARS. Permite administrar servicios, trabajadores, citas y horarios, facilitando la organización y el seguimiento de las tareas diarias.

## Funcionalidades principales
Gestión de servicios del taller (aceite, frenos, motor, etc.).

Administración de trabajadores y asignación de servicios y horarios.

Creación, edición y eliminación de citas para clientes.

Control del estado de las citas (pendiente, en proceso, finalizado).

Autenticación y rol de usuarios (administrador, trabajador).

Almacenamiento persistente usando localStorage para mantener los datos sin necesidad de backend.

## Tecnologías usadas
Angular 16

TypeScript

HTML / CSS

LocalStorage para persistencia de datos

## Instalación
  ## Instalar las dependencias
  npm install
  ## Ejecutar la aplicación
  ng serve
  ## En el navegador introducir
  http://localhost:4200
  
## Configuración inicial
Al iniciar la aplicación por primera vez, se crean automáticamente los datos base en localStorage:

Servicios disponibles predefinidos.

Usuario administrador con:

Nombre: admin

Email: admin@gmail.com

Contraseña: 123456

Estos datos se usarán para acceder como primer usuario a la aplicación, así creando otros usuarios desde este.

## Uso de la aplicación
-En la página principal se puede ver un texto inicial y después un apartado en el que se puede crear una cita, pudiendo crearla cualquier persona. Se selecciona un servicio, se pincha en el día deseado y se rellena el formulario. En la parte inferior tenemos un buscador por profesional introduciendo el nombre del trabajador o por especialidad introduciendo una de ellas.

-En el navbar podremos acceder al login donde introduciremos las credenciales.

-Nos llevará a administrador o a profesional donde encontraremos la información del profesional logueado.
  -En administrador nos aparecerán dos formuarios uno para crear profesionales y otro para crear citas, Aparecerá una lista con los profesionales que podrán ser eliminados, o editados mediante el mismo formulario con el que se crean, inchando en editar ya carga los datos. Lo mismo ocurre con las citas, se modifican de la misma manera. En las citas aparecerán todos los datos de estas mismas, también se podrá modificar el estado, asignar un profesional, editar o eliminar.
  
  -En profesional podremos crear una nueva cita pinchando en el botón específico para ello, se desplegará un modal con un formulario donde rellenaremos los datos necesarios. También tiene una lista de citas per osolo con las citas en las que los servicios son los mismos que las aptitudes de los mecánicos, pudiendo modificar estado, añadir como una tarea, editar o eliminar. Al editar se vuelve a usar el mismo modal, una vez pulsado el botón de editar se despliega el modal.

  - En la página principal:
    - Se puede crear una cita seleccionando un servicio, el día y rellenando un formulario.
    - Hay un buscador por profesional o especialidad.

  - En el navbar:
    - Acceso al login para introducir credenciales.
    
  - Tras login:
    - **Administrador:**
      - Crear, editar y eliminar profesionales.
      - Crear, editar y eliminar citas.
      - Modificar estado y asignar profesionales a citas.

    - **Profesional:**
      - Crear citas mediante un modal.
      - Ver lista de citas asignadas.
      - Modificar estado, editar o eliminar citas.