import {AuthenticationService} from './_services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {User} from './_user/user';
import {UserService} from './_services/index';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  currentUser: User;
  title = 'FoD & Kiuwan Dashboard';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService                    /* @aaa   Listado de usuarios */
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    console.log("AdminUserComponent.ngOnInit");
    //this.loadAllUsers();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
