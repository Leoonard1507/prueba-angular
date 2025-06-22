import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrabajadorListComponent } from './admin/components/trabajador-list/trabajador-list.component';
import { TrabajadorAddEditComponent } from './admin/components/trabajador-add-edit/trabajador-add-edit.component';
import { HomeComponent } from './home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TrabajadorComponent } from './profesional/profesional.component';
import { CrearCitaComponent } from './crear-editar-cita/crear-editar-cita.component';  

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TrabajadorComponent,
    CrearCitaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    TrabajadoresComponent,
    FormsModule,
    TrabajadorListComponent,
    TrabajadorAddEditComponent,
    FullCalendarModule, 
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
