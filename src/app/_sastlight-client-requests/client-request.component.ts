import { Component, OnInit } from '@angular/core';

import {Application} from '../classes/application';
import {MessageService} from '../message.service';

import {ApplicationProviderService} from '../_services/applicationprovider.service';

import {ViewChild, AfterViewInit} from '@angular/core';

import {MatPaginator, MatTableDataSource, MatSort, MatCardModule} from '@angular/material';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import {User} from '../_user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-request',
  templateUrl: './client-request.component.html',
  styleUrls: ['./client-request.component.css']
})
export class ServiceRequestComponent implements OnInit, AfterViewInit  {

  currentUser: User;
  
  constructor(
    private appProv: ApplicationProviderService,
    private messageService: MessageService,
    private router: Router
  ) {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Constructor de ApplicationsComponent: " + JSON.stringify(this.currentUser)); //@aaa delete
  }

  // applications: Application[] = MOCK_APPLICATIONS; //@aaa mock-applications
  applications: Application[];


  dataSource = new MatTableDataSource<Application>(this.applications);
  displayedColumns = ['select', 'id', 'name', 'descriptcion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  /** Row selection setup */
  selection = new SelectionModel<Application>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  
  onRowClicked(row) {
    console.log('ApplicationsComponent.onRowClicked  clicked: ', row);
    this.router.navigate(['/detail/' + row.id]);
    
  }
 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
    this.paginator._intl.itemsPerPageLabel = "Request per page";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
