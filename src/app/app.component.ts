import {Component, OnInit} from '@angular/core';
import {User} from './_user/user';
import {UserService} from './_services/index';

@Component({
  //moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Isban Application Security Management';

  ngOnInit() {
  }
}




