import {Chart} from 'chart.js';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import 'rxjs/add/operator/map';

import {Application} from '../classes/application';
import {ApplicationProviderService} from '../_services/applicationprovider.service';
import {ClientRequestProviderService} from '../_services/clientrequestprovider.service';


import {User} from '../_user/user';                     /* @aaa   Listado de usuarios */
import {GeneralStatistisc} from '../classes/generalstatistisc';
import {SASTRequest} from '../classes/sastrequest';
import {MessageService} from '../message.service';
// import {UserService} from '../_services/index';         /* @aaa   Listado de usuarios */

class DashBoardGraphInfoNode {
  constructor() {
    this.graph = null;
    this.title = '';
    this.subtitle = '';
    this.index = 0;

  }
  graph: Chart = null;
  index: number;
  title: string;
  subtitle: string;
}

@Component({
  // moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  applications: Application[] = [];

  currentUser: User;

  private requestList: SASTRequest[];

  private MAX_CHARTS = 2;
  private SHOW_CHARTS = 0;
  graphsInfo: DashBoardGraphInfoNode[] = [];

  //  chart = []; //
  //  chart2 = []; //

  private PRO: GeneralStatistisc = new GeneralStatistisc();
  private USER: GeneralStatistisc = new GeneralStatistisc();
  private APP: GeneralStatistisc = new GeneralStatistisc();
  private BA: GeneralStatistisc = new GeneralStatistisc();
  private FC: GeneralStatistisc = new GeneralStatistisc();

  constructor(
    private appProv: ApplicationProviderService,
    private messageService: MessageService,
    private requestService: ClientRequestProviderService
    // private userService: UserService                    /* @aaa   Listado de usuarios */
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.initalizeGraphInfo();
  }

  initalizeGraphInfo(): void {
    // To recolect data when request are loaded
    this.PRO = new GeneralStatistisc();
    this.USER = new GeneralStatistisc();
    this.APP = new GeneralStatistisc();
    this.BA = new GeneralStatistisc();
    this.FC = new GeneralStatistisc();

    //this.graphsInfo = new Array[this.MAX_CHARTS];
    for (let i = 0; i < this.MAX_CHARTS; i++) {
      let node = new DashBoardGraphInfoNode();
      node.index = i;
      node.title = 'Title';
      node.subtitle = 'Subtitle';
      this.graphsInfo.push(node);
    }
  }

  
  
  ngAfterViewInit(){
    console.log("ngAfterViewInit.ngOnInit");
    let temp_max = [23, 24, 25];
    let temp_min = [12, 13, 12];
    let alldates = ['d1', 'd2', 'd3'];
    let weatherDates = ['d1', 'd2', 'd3'];

    for (let i = 0; i < this.MAX_CHARTS; i++) {
        this.graphsInfo[i].graph = new Chart( 'iCanvas_' + i, {
          type: 'bar',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: "#3cba9f",
                fill: false
              },
              {
                data: temp_min,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
     }
  }
  
  ngOnInit() { // ngAfterViewInit

    console.log("DashboardComponent.ngOnInit");
    this.getRequestList();

  }


  getApplications(): void {
    console.log("DashboardComponent.getApplications");
    this.appProv.getApplications().subscribe(applications => this.applications = applications.slice(1, 9));
  }

  getRequestList(): void {
    this.requestService.getAll().subscribe(
      sastRequestList => this.getRequestList_CB(sastRequestList)
    );
  };



  getRequestList_CB(reqList: SASTRequest[]): void {

    for (let i = 0; i < reqList.length; i++) {
      //console.log ("----------_>"+JSON.stringify(reqList[i]));
      this.BA.addValue(reqList[i].PM_BA);
      this.FC.addValue(reqList[i].PM_FC);
      this.PRO.addValue(reqList[i].P_PRO);
      this.USER.addValue('[' + reqList[i].PM_UID + ']-' + reqList[i].PM_FN + reqList[i].PM_LN);
      this.APP.addValue(reqList[i].P_APP);
      this.SHOW_CHARTS = 1;
    }

    this.requestList = reqList;

    console.log("----------_>Request#=" + this.requestList.length);
  };

}





