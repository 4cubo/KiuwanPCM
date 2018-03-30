import {Component, OnInit} from '@angular/core';
import {Application} from '../application';
import {MOCK_APPLICATIONS} from '../mock-applications'; //@aaa mock-applications

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor() {
    console.log("Constructor de ApplicationsComponent"); //@aaa delete
  }

  applications: Application[] = MOCK_APPLICATIONS; //@aaa mock-applications

  //Selected in main list
  selectedApp: Application;
  
  onSelect(app: Application): void {
    console.log("  Application selected " + app.name); //@aaa delete
    this.selectedApp = app;
  }

  ngOnInit() {
  }

}


