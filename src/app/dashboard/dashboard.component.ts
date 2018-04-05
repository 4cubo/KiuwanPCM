import {Component, OnInit} from '@angular/core';

import {Application} from '../application';
import {ApplicationProviderService} from '../applicationprovider.service';


 import {User} from '../_user/user';                     /* @aaa   Listado de usuarios */
// import {UserService} from '../_services/index';         /* @aaa   Listado de usuarios */


@Component({
  // moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  applications: Application[] = [];

  currentUser: User;
  // users: User[] = [];

  constructor(
    private appProv: ApplicationProviderService,
    // private userService: UserService                    /* @aaa   Listado de usuarios */
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    console.log("DashboardComponent.ngOnInit");
    this.getApplications();
    // this.loadAllUsers();
  }


  getApplications(): void {
    console.log("DashboardComponent.getApplications");
    this.appProv.getApplications()
      .subscribe(applications => this.applications = applications.slice(1, 9));
  }
}






