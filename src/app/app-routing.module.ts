import { AuthGuard } from './_auth/auth.guard';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ApplicationsComponent } from './applications/applications.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard' , pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'detail/:id', component: ApplicationDetailComponent, canActivate: [AuthGuard] },
  { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admu', component: AdminUserComponent, canActivate: [AuthGuard] }, /* @aaa TODO add AdminGuard to access this functionality */

  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
