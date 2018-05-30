import { Component, OnInit } from '@angular/core';

// import { Application} from '../classes/application';
import { MessageService} from '../message.service';
// import { ApplicationProviderService} from '../_services/applicationprovider.service';
import { ClientRequestProviderService } from '../_services/clientrequestprovider.service';
import { ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatCardModule} from '@angular/material';
import { DataSource, SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { User} from '../_user/user';
import { SASTRequest } from '../classes/sastrequest';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-request',
  templateUrl: './client-request.component.html',
  styleUrls: ['./client-request.component.css']
})
export class ServiceRequestComponent implements OnInit, AfterViewInit  {

  currentUser: User;
  
  constructor(
    //private appProv: ApplicationProviderService,
    private messageService: MessageService,
    private router: Router,
    private requestService: ClientRequestProviderService
  ) {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Constructor de ApplicationsComponent: " + JSON.stringify(this.currentUser)); //@aaa delete
  }

  requestList: SASTRequest[];

  dataSource = new MatTableDataSource<SASTRequest>(this.requestList);
  //displayedColumns = ['select', 'id', 'name', 'descriptcion'];
  displayedColumns = ['select', 'P_DES', 'P_APP', 'P_PRO', 'PM_BA', 'PM_FC', 'P_NUMTEC', 'P_CLI'];

  loadingDataHidden = false; //Initial state

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  /** Row selection setup */
  selection = new SelectionModel<SASTRequest>(true, []);

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
    console.log('ClientRequestComponent.onRowClicked  clicked: ', row);
    // this.router.navigate(['/detail/' + row.id]);
  }

  applyFilter( filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getRequestList_CB( reqList: SASTRequest[]  ): void {
    /*for ( let i = 0; i < reqList.length; i++ ){
        console.log ("----------_>"+JSON.stringify(reqList[i]));
    }*/
    this.requestList = reqList;
    this.dataSource.data = reqList;
  }

  getRequestList(): void {
    this.requestService.getAll().subscribe( 

      data => {
        this.getRequestList_CB(data); 
        //this.requestList = data;
        //this.dataSource.data = data;
      },
      error => { 
        console.log ("Error getting requests " , error ); 
        this.loadingDataHidden = true; // hide loading
      },
      () => {
        console.log ("Data  completed" );
        this.loadingDataHidden = true; // hide loading
      }
    );
  };

  ngOnInit() {
    this.loadingDataHidden = false; // show loading
    this.getRequestList();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Request per page";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
