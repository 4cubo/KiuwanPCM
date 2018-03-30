import { Component, OnInit } from '@angular/core';
import { Application } from '../application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor() { }

  application: Application {
    id : 1,
    name : 'Acelera',
    description : "Descripcion de Acelera"
  };
  
  ngOnInit() {
  }

}


