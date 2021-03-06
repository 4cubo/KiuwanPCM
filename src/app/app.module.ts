import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { DashboardComponent } from './dashboard/dashboard.component';




/* @aaa Angular Material , MatButtonToggleGroup, */
import { MatTableModule,  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatExpansionModule} from '@angular/material';
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
import { MessageService } from './_services/message.service';
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
import { FoDAppListComponent } from './fod-app-list/fod-app-list.component';
import { FoDService } from './_services/fortify.service';
import { FoDAppRelListComponent } from './fod-app-rel-list/fod-app-rel-list.component';
import { FoDAppRelVulListComponent } from './fod-app-rel-vul-list/fod-app-rel-vul-list.component';
import { FoDAppRelVulDetailsComponent } from './fod-app-rel-vul-details/fod-app-rel-vul-details.component';
import { FodAppListMsgPanelComponent } from './fod-app-list/fod-app-list-msg-panel.component';
import { FodAppListMsgService } from './fod-app-list/fod-app-list-msg.service';
import { FodLoadDbComponent } from './fod-load-db/fod-load-db.component';


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
    FoDAppListComponent,
    FoDAppRelListComponent,
    FoDAppRelVulListComponent,
    FoDAppRelVulDetailsComponent,
    FodAppListMsgPanelComponent,
    FodLoadDbComponent,
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
    MatExpansionModule,

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
    FodAppListMsgService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
