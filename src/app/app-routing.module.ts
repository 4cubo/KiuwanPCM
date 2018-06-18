import { AuthGuard } from './_auth/auth.guard';
import { NewSastlightClientRequestComponent } from './_sastlight-client-request/new-sastlight-client-request.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { KiuwanApplicationDetailComponent } from './kiuwan-application-detail/kiuwan-application-detail.component';
import { KiuwanApplicationListComponent } from './kiuwan-applications/kiuwan-applications.component';
import { ServiceRequestComponent } from './_sastlight-client-requests/client-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashBoardPanelComponent } from './dash-board-panel/dash-board-panel.component';
import { KiuwanDataComponent } from './kiuwan-data/kiuwan-data.component';
import { DashboardDetailGraphComponent } from './dashboard-detail-graph/dashboard-detail-graph.component';
import { FoDAppListComponent } from './fod-app-list/fod-app-list.component';
import { FoDAppRelVulListComponent } from './fod-app-rel-vul-list/fod-app-rel-vul-list.component';
import { FoDAppRelListComponent } from './fod-app-rel-list/fod-app-rel-list.component';
import { FoDAppRelVulDetailsComponent } from './fod-app-rel-vul-details/fod-app-rel-vul-details.component';
import { FodLoadDbComponent } from './fod-load-db/fod-load-db.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard' , pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [ {
      path: 'detail/:name',
      component: DashboardDetailGraphComponent
    }]
  }, 
  { path: 'detail/:name', component: KiuwanApplicationDetailComponent, canActivate: [AuthGuard] },
  { path: 'kiuwan', component: KiuwanApplicationListComponent, canActivate: [AuthGuard], 
    children: [ {
      path: 'detail/:name',
      component: KiuwanApplicationDetailComponent
    }]
  },
  { path: 'kiuwandata', component: KiuwanDataComponent, canActivate: [AuthGuard], 
    children: [ { //OK
      path: 'detail/:name',
      component: KiuwanApplicationDetailComponent
    }]
  },
  { path: 'srequest', component: ServiceRequestComponent, canActivate: [AuthGuard] },
  { path: 'nrequest', component: NewSastlightClientRequestComponent, canActivate: [AuthGuard] },
  

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admu', component: AdminUserComponent, canActivate: [AuthGuard] }, /* @aaa TODO add AdminGuard to access this functionality */

  
  { path: 'foddb', component: FodLoadDbComponent, canActivate: [AuthGuard] },
  { path: 'fod', component: FoDAppListComponent, canActivate: [AuthGuard], 
    children: [ { 
      path: ':applicationId', 
      //path: 'rel/:applicationId/:iToken', 
      component: FoDAppRelListComponent,
      children: [ { 
        path: ':releaseId', 
        component: FoDAppRelVulListComponent,
        children: [ { 
          path: ':vulId', 
          component: FoDAppRelVulDetailsComponent,
        }]
      }]
    }]
},

  
 // { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes), RouterModule.forChild(routes)  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
