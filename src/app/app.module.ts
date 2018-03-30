import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent,
    ApplicationDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
