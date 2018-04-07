import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ApplicationProviderService } from './_services/applicationprovider.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// @aaa Angular Material
import { MatTableModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule} from '@angular/material';
import { MatCheckboxModule, MatSelectModule, MatCardModule, MatIconModule, MatChipsModule, MatFormFieldModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFileUploadModule } from 'angular-material-fileupload';

import { GrowlModule} from 'primeng/growl';
import { FileUploadModule} from 'primeng/fileupload';
import { Message} from 'primeng/api';

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

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent,
    ApplicationDetailComponent,
    MessagesComponent,
    DashboardComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    AdminUserComponent,
    ServiceRequestComponent,
    NewSastlightClientRequestComponent,
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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
//    MatFileUploadModule,
//    MatFormFieldModule
    GrowlModule,
    FileUploadModule
  ],
  providers: [
    AuthGuard,
    ApplicationProviderService,
    MessageService,
    AlertService,
    AuthenticationService,
    UserService,
    JwtInterceptorProvider
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
