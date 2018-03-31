import {Component, OnInit} from '@angular/core';
import {Application} from '../application';
import {MessageService} from '../message.service';

//import {MOCK_APPLICATIONS} from '../mock-applications'; //@aaa mock-applications
import {ApplicationProviderService} from '../applicationprovider.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private appProv: ApplicationProviderService, private messageService: MessageService) {
    console.log("Constructor de ApplicationsComponent"); //@aaa delete
  }

  // applications: Application[] = MOCK_APPLICATIONS; //@aaa mock-applications
  applications: Application[];

  // Selected in main list
  // selectedApp: Application;

  getApplications(): void {
    /*this.applications = this.appProv.getApplications()*/
    this.appProv.getApplications().subscribe(apps => this.applications = apps);
  }

/*
  onSelect(app: Application): void {
    if (this.selectedApp !== app) {
      this.messageService.add('ApplicationsComponent: selected app:' + app.name);
      this.selectedApp = app;
    }
  }
*/
  ngOnInit() {
    this.getApplications();
  }

}


