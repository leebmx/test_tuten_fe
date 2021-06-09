import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { BookingsComponent } from './components/booking/booking.component';
import { LoginComponent } from './components/login/login.component';
import { AuthCheckLoginGuard } from './guards/auth-check-login.guard';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path:'', component: HomeComponent, canActivate: [AuthCheckLoginGuard],},
  { path:'booking', component: BookingsComponent, canActivate: [AuthCheckLoginGuard],},
  { path:'empleados', component: EmpleadoComponent, canActivate: [AuthCheckLoginGuard],},
  { path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
