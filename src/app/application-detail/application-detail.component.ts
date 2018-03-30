import { Component, OnInit, Input } from '@angular/core';
import {Application} from '../application';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css']
})

export class ApplicationDetailComponent implements OnInit {

  constructor() { 
   console.log("Constructor de ApplicationDetailComponent"); //@aaa delete
  }

  @Input() app: Application;

  ngOnInit() {
  }


}
