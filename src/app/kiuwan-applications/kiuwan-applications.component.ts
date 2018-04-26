import {Component, OnInit} from '@angular/core';
import {Observable } from 'rxjs';
import {ViewChild, AfterViewInit} from '@angular/core';
import {Router } from '@angular/router';
import {MessageService} from '../message.service';
import {Kiuwanapplication} from '../classes/kiuwanapplication';
import {KiuwanApplicationService} from '../_services/kiuwan.application.service';
import {MatPaginator, MatTableDataSource, MatSort, MatCardModule} from '@angular/material';
import {DataSource, SelectionModel} from '@angular/cdk/collections';



@Component({
  selector: 'app-applications',
  templateUrl: './kiuwan-applications.component.html',
  styleUrls: ['./kiuwan-applications.component.css']
})
  
export class ApplicationListComponent implements OnInit, AfterViewInit  {

  constructor(
    private appProv: KiuwanApplicationService,
    private messageService: MessageService,
    private router: Router
  ) {
    console.log("Constructor de ApplicationsComponent"); //@aaa delete
  }

  userName = "poc.isban.alvaro.alonso";
  userPasswd = "q0q=tnJsV1Isn9HUECaR";

  applications: Kiuwanapplication[];
  dataSource = new MatTableDataSource<Kiuwanapplication>(this.applications);
  displayedColumns = [ 'name', 'descriptcion', 'applicationBusinessValue', 'applicationProvider',
    '_portfolio_Aplicacion',
    '_portfolio_Business_Area',
    '_portfolio_Cliente',
    '_portfolio_Functional_Community',
    '_portfolio_Main_Projet',
    '_portfolio_Proyecto',
    '_portfolio_Tecnologia',
    '_isValidProyect'
  
  ]; //'select', 'id',

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Row selection setup */
  selection = new SelectionModel<Kiuwanapplication>(true, []);

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
    console.log('ApplicationsComponent.onRowClicked  clicked: ', row.name);
    this.router.navigate(['/detail/' + row.name]);
    
  }
 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getApplicationsCB( appList: Kiuwanapplication[]  ): void {
    //    for (let i =0; i < appList.length; i++ ){
//      if(appList[i]._isValidProyect){
//        this.applications.push( appList[i] as Kiuwanapplication );
//      }
//    }
    
    
    this.applications = appList;
    this.dataSource.data = appList;
    
//    for (let i =0; i < appList.length; i++ ){
//      if(appList[i]._isValidProyect){
//        this.applications.push( appList[i] as Kiuwanapplication );
//      }
//    }
//    this.dataSource.data = this.applications;
//    
  }

  getApplications(): void {
    this.appProv.getApplications()
      .subscribe(
        apps => {
            //console.log ( 'getApplications->', apps );
            this.getApplicationsCB(apps as Kiuwanapplication[]);
        },
        error => {
            console.log ( 'getApplications->ERROR', error );
        } );
  }

 
  ngOnInit() {
    this.appProv.setCredentials ( this.userName, this.userPasswd );
    this.getApplications();
  }
  
  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Apps per page";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
