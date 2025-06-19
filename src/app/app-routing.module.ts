import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { TrabajadorComponent } from './profesional/profesional.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'login', component: LoginComponent }, // Ruta login
  { path: 'admin', component: AdminComponent }, // Ruta admin
  { path: 'profesional', component: TrabajadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
