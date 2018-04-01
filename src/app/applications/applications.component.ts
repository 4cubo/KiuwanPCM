import {Component, OnInit} from '@angular/core';
import {Application} from '../application';
import {MessageService} from '../message.service';

//import {MOCK_APPLICATIONS} from '../mock-applications'; //@aaa mock-applications
import {ApplicationProviderService} from '../applicationprovider.service';

import {ViewChild, AfterViewInit} from '@angular/core';

import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, AfterViewInit  {

  constructor(private appProv: ApplicationProviderService, private messageService: MessageService) {
    console.log("Constructor de ApplicationsComponent"); //@aaa delete
  }

  // applications: Application[] = MOCK_APPLICATIONS; //@aaa mock-applications
  applications: Application[];


  dataSource = new MatTableDataSource<Application>(this.applications);
  displayedColumns = ['id', 'name', 'descriptcion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  onRowClicked(row) {
    console.log('ApplicationsComponent.onRowClicked  clicked: ', row);
  }
 
  

  getApplicationsCB( appList: Application[]  ): void {
    this.applications = appList;
    this.dataSource.data = appList;
  }

  getApplications(): void {
    this.appProv.getApplications().subscribe( apps => this.getApplicationsCB(apps));
  }

 
  ngOnInit() {
    this.getApplications();
  }
  
  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Apps per page";
    this.dataSource.paginator = this.paginator;
  }
}

export class ApplicationDataSource extends DataSource<any> {
  
  constructor(private appProv: ApplicationProviderService) {
    super();
  }
  
  connect(): Observable<Application[]> {
    return this.appProv.getApplications();
  }
  
  disconnect() {}
}




