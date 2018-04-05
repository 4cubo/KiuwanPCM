import {Component, OnInit} from '@angular/core';
import {User} from './_user/user';
import {UserService} from './_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  currentUser: User;
  title = 'Isban Application Security Management';

  constructor(
    private userService: UserService                    /* @aaa   Listado de usuarios */
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    console.log("AdminUserComponent.ngOnInit");
    //this.loadAllUsers();
  }
}




