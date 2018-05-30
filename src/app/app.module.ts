import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { KiuwanApplicationListComponent } from './kiuwan-applications/kiuwan-applications.component';
//import { ApplicationListComponent } from './kiuwan-applications/kiuwan-applications.component';
import { KiuwanApplicationDetailComponent } from './kiuwan-application-detail/kiuwan-application-detail.component';
import { KiuwanApplicationService } from './_services/kiuwan.application.service';

import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* @aaa Angular Material , MatButtonToggleGroup, */
import { MatTableModule,  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule} from '@angular/material';
import { MatCheckboxModule, MatSelectModule, MatCardModule, MatIconModule, MatChipsModule, MatFormFieldModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFileUploadModule } from 'angular-material-fileupload';
//import { MatGridListModule } from '@angular/material/grid';

import { GrowlModule} from 'primeng/growl';   /* @aaa @TODO Delete from project, not used yet in upload file component*/
import { FileUploadModule} from 'primeng/fileupload';
import { Message} from 'primeng/api';         /* @aaa @TODO Delete from project, not used yet in upload file component*/
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AlertComponent } from './_alert/alert.component';
import { AuthGuard } from './_auth/auth.guard';
import { JwtInterceptorProvider } from './_helpers/jwt.interceptor';
import { AlertService, UserService } from './_services/index';
import { AuthenticationService } from './_services/authentication.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { ServiceRequestComponent } from './_sastlight-client-requests/client-request.component';
import { NewSastlightClientRequestComponent } from './_sastlight-client-request/new-sastlight-client-request.component';
import { ClientRequestProviderService } from './_services/clientrequestprovider.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { KiuwanApplicationTableListComponent } from './kiuwan-applications/kiuwan-applications-table.component';
import { DashBoardPanelComponent } from './dash-board-panel/dash-board-panel.component';
import { KiuwanDataComponent } from './kiuwan-data/kiuwan-data.component';
import { DashboardDetailGraphComponent } from './dashboard-detail-graph/dashboard-detail-graph.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FortifyOnDemandComponent } from './fortify-on-demand/fortify-on-demand.component';
import { FoDService } from './_services/fortify.service';

@NgModule({
  declarations: [
    AppComponent,
    KiuwanApplicationListComponent,
    KiuwanApplicationTableListComponent,
    KiuwanApplicationDetailComponent,
    MessagesComponent,
    DashboardComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    AdminUserComponent,
    ServiceRequestComponent,
    NewSastlightClientRequestComponent,
    DashBoardPanelComponent,
    KiuwanDataComponent,
    DashboardDetailGraphComponent,
    FortifyOnDemandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,          // @aaa Angular Material
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,

    MatChipsModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
//    MatFileUploadModule,
//    MatFormFieldModule
    MatGridListModule,
    GrowlModule,
    FileUploadModule,
    OrganizationChartModule,
    TabViewModule,
    FieldsetModule,
    ConfirmDialogModule
  ],
  providers: [
    AuthGuard,
    JwtInterceptorProvider,
    UserService,
    KiuwanApplicationService,
    FoDService,
    MessageService,
    AlertService,
    AuthenticationService,
    ConfirmationService,
    ClientRequestProviderService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
