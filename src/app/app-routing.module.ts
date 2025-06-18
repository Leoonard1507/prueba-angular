import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: TrabajadoresComponent }, // Ruta principal
  { path: 'login', component: LoginComponent }, // Ruta login
  { path: 'admin', component: AdminComponent }, // Ruta admin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
