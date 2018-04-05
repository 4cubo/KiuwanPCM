import { UserService } from '../_services/user.service';
import { User } from '../_user/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  
  constructor(
    //private appProv: ApplicationProviderService,
    private userService: UserService                    /* @aaa   Listado de usuarios */
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
    console.log("AdminUserComponent.ngOnInit");
    this.loadAllUsers();
  }
  
  deleteUser(_id: string) {
    this.userService.delete(_id).subscribe(() => {this.loadAllUsers()});
  }
  
  private loadAllUsers() {
    console.log("AdminUserComponent.loadAllUsers");
    this.userService.getAll().subscribe( users => {this.users = users; });
  }

}
