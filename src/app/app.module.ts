import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ApplicationProviderService } from './applicationprovider.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { DashboardComponent } from './dashboard/dashboard.component';

// @aaa Angular Material
//import {MatTableModule, MatPaginator, MatTableDataSource} from '@angular/material';
import {MatTableModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
         MatSortModule, MatCheckboxModule, MatSelectModule, MatCardModule, MatIconModule, MatChipsModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent,
    ApplicationDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    NoopAnimationsModule
  ],
  providers: [
    ApplicationProviderService,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
