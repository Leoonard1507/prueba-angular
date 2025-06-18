import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { TrabajadorListComponent } from './admin/components/trabajador-list/trabajador-list.component';
import { TrabajadorAddComponent } from './admin/components/trabajador-add/trabajador-add.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    TrabajadoresComponent,
    FormsModule,
    TrabajadorListComponent,
    TrabajadorAddComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
