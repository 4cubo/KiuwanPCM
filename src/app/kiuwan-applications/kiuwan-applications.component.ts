import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewChild, ViewChildren, ViewChildrenDecorator, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { KiuwanApplication } from '../classes/kiuwanapplication';
import { KiuwanApplicationService } from '../_services/kiuwan.application.service';
import { MatPaginator, MatTableDataSource, MatSort, MatCardModule } from '@angular/material';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { KiuwanApplicationTableListComponent } from './kiuwan-applications-table.component';
import { MessageService } from '../_services/message.service';



@Component({
  selector: 'app-applications',
  templateUrl: './kiuwan-applications.component.html',
  styleUrls: ['./kiuwan-applications.component.css']
})

export class KiuwanApplicationListComponent implements OnInit, AfterViewInit {

  constructor(
    private appProv: KiuwanApplicationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log("Constructor de ApplicationsComponent"); //@aaa delete
  }

  applications: KiuwanApplication[];
  applications_POC: KiuwanApplication[];


  //@ViewChild(ApplicationTableListComponent) appTableList: ApplicationTableListComponent;
  @ViewChildren(KiuwanApplicationTableListComponent) items;
  //@ViewChild(ApplicationTableListComponent) appTableList2: ApplicationTableListComponent;

  appTableList: KiuwanApplicationTableListComponent;
  appTableList2: KiuwanApplicationTableListComponent;

  dataLoaded: boolean = false;

  color = 'warn'; // primary warn  accent
  mode = 'indeterminate'; // indeterminate determinate
  value = 0;
  loadingText = 'Loading Kiuwan Applications'


  getApplicationsCB(appList: KiuwanApplication[]): void {
    this.applications = new Array<KiuwanApplication>();
    this.applications_POC = new Array<KiuwanApplication>();

    for (var i = 0; i < appList.length; i++) {
      this.value = (i * 100) / appList.length;
      let item: KiuwanApplication = appList[i] as KiuwanApplication;
      KiuwanApplication.explodeData(item);


      if (item._isValidProyect && item._isValidProyect === 'S-SDLC') {
        this.applications.push(item);
        //console.log('         added: ', typeof item, item);
      } else {
        this.applications_POC.push(item);
        //console.log('         -----------_>added POC: ', typeof item, item);
      }
    };

    // @aaa @TODO  Esto hay que quitarlo de aquí o gestionarlo bien, esta salvando siempre aunque ya esté hecho el trabajo en la carga anterior
    localStorage.setItem('KiuwanApplications', JSON.stringify(appList));

    this.dataLoaded = true;
    this.appTableList.dataSource.data = this.applications;
    this.appTableList2.dataSource.data = this.applications_POC;


  }

  getApplications(): void {

    this.color = 'warn'; // primary warn  accent
    this.mode = 'indeterminate'; // indeterminate determinate
    //this.value = 0;


    //     @aaa @TODO Do not use LocalStorage in the future, session storage or server mongo instead
    //    let apps: Kiuwanapplication[] =
    //      JSON.parse(localStorage.getItem('KiuwanApplications'));
    //    if (apps) {
    //      this.applications = apps;
    //      return;
    //    }

    this.appProv.getApplications()
      .subscribe(
        apps => {
          //console.log ( 'getApplications->', apps );
          this.color = 'accent'; // primary warn  accent
          this.mode = 'determinate'; // indeterminate determinate
          this.value = 0;

          this.getApplicationsCB(apps as KiuwanApplication[]);
        },
        error => {
          console.log('getApplications->ERROR', error);
        }
      );
  }


  ngOnInit() {
    this.appProv.setCredentials("poc.isban.alvaro.alonso", "q0q=tnJsV1Isn9HUECaR");
    //this.appProv.setCredentials(this.userName, this.userPasswd);

  }

  ngAfterViewInit() {
    this.appTableList = this.items.toArray()[0];
    this.appTableList2 = this.items.toArray()[1];
    this.getApplications();
    // this.appTableList.getApplications();
  }
}
