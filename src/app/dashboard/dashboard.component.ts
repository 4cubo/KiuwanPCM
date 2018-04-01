import { Component, OnInit } from '@angular/core';

import { Application } from '../application';
import { ApplicationProviderService } from '../applicationprovider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  applications: Application[] = [];

  constructor(private appProv: ApplicationProviderService) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.appProv.getApplications()
      .subscribe(applications => this.applications = applications.slice(1, 9));
  }
}