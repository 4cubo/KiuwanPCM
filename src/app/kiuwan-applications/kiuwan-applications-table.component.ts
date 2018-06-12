import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ViewChild, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {KiuwanApplication} from '../classes/kiuwanapplication';
import {KiuwanApplicationService} from '../_services/kiuwan.application.service';
import {MatPaginator, MatTableDataSource, MatSort, MatCardModule} from '@angular/material';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import { MessageService } from '../_services/message.service';


@Component({
  selector: 'kiuwan-applications-table',
  templateUrl: './kiuwan-applications-table.component.html',
  styleUrls: ['./kiuwan-applications-table.component.css']
})

export class KiuwanApplicationTableListComponent implements OnInit, AfterViewInit {

  constructor(
    private appProv: KiuwanApplicationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    console.log("Constructor de ApplicationsComponent"); //@aaa delete
  }


  applications: KiuwanApplication[];
  dataSource = new MatTableDataSource<KiuwanApplication>(this.applications);
  displayedColumns = [
    'name',
    'descriptcion',
    //'applicationBusinessValue',
    'applicationProvider',
    '_portfolio_Aplicacion',
    '_portfolio_Business_Area',
    '_portfolio_Cliente',
    '_portfolio_Functional_Community',
    '_portfolio_Main_Projet',
    '_portfolio_Proyecto',
    '_portfolio_Tecnologia',
    //'_isValidProyect'

  ]; //'select', 'id',

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  color = 'warn'; // primary warn  accent
  mode = 'indeterminate'; // indeterminate determinate
  value = 0;
  loadingText  = 'Loading Kiuwan Applications'

  /** Row selection setup */
  selection = new SelectionModel<KiuwanApplication>(true, []);

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
    //this.router.navigate(['/detail/' + row.name]);
    this.router.navigate(['/kiuwan/detail/' + row.name], { relativeTo: this.route } );
    //this.router.navigate(['/detalle']);

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  


  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Apps per page";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
