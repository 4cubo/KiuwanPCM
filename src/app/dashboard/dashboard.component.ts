import {Chart} from 'chart.js';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import 'rxjs/add/operator/map';

import {Kiuwanapplication} from '../classes/kiuwanapplication';
import {KiuwanApplicationService} from '../_services/kiuwan.application.service';
import {ClientRequestProviderService} from '../_services/clientrequestprovider.service';


import {User} from '../_user/user';                     /* @aaa   Listado de usuarios */
import {GeneralStatistisc, DashBoardGraphInfoNode} from '../classes/generalstatistisc';
import {SASTRequest} from '../classes/sastrequest';
import {MessageService} from '../message.service';
// import {UserService} from '../_services/index';         /* @aaa   Listado de usuarios */


@Component({
  // moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  currentUser: User;

  private requestList: SASTRequest[];

  private PRO: GeneralStatistisc = new GeneralStatistisc();
  private USER: GeneralStatistisc = new GeneralStatistisc();
  private APP: GeneralStatistisc = new GeneralStatistisc();
  private BA: GeneralStatistisc = new GeneralStatistisc();
  private FC: GeneralStatistisc = new GeneralStatistisc();

  private CLI: GeneralStatistisc = new GeneralStatistisc();
  private PRV: GeneralStatistisc = new GeneralStatistisc();

  private MAX_CHARTS = 6;
  private SHOW_CHARTS = 0;
  private graphsInfo: DashBoardGraphInfoNode[] = [];

  private graphDataConf = [
    // Gráfica de peticiones por Bussines Área
    {title: 'Bussines Area', subTitle: 'Request by Bussines Area', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por Comunidad Funcional
    {title: 'Functional Comunity', subTitle: 'Request by Functional Comunity', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por Aplicación
    {title: 'Application', subTitle: 'Request by Application', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por proyecto
    {title: 'Project', subTitle: 'Request by project', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por cliente
    {title: 'Client', subTitle: 'Request by client', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por proveedor
    {title: 'Provider', subTitle: 'Request by provider', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
  ];



  constructor(
    private appProv: KiuwanApplicationService,
    private messageService: MessageService,
    private requestService: ClientRequestProviderService
    // private userService: UserService                    /* @aaa   Listado de usuarios */
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.initalizeGraphInfo();
  }


  private _BAR_GRAPH_CONF(i: number): any {
    return {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          categorySpacing: 0,
          maxBarThickness: 50,
          categoryPercentage: 1,
          barPercentage: 0.5,
          autoSkip: false
        }],
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: (this.graphsInfo[i].data.min - 1 < 0) ? 0 : this.graphsInfo[i].data.min - 1,
            max: this.graphsInfo[i].data.max,
          }
        }]
      }
    };
  }
  initalizeGraphInfo(): void {
    // To recolect data when request are loaded
    this.PRO = new GeneralStatistisc();
    this.USER = new GeneralStatistisc();
    this.APP = new GeneralStatistisc();
    this.BA = new GeneralStatistisc();
    this.FC = new GeneralStatistisc();
    this.CLI = new GeneralStatistisc();
    this.PRO = new GeneralStatistisc();

    for (let i = 0; i < this.MAX_CHARTS; i++) {
      let node = new DashBoardGraphInfoNode();
      node.index = i;
      node.title = this.graphDataConf[i].title;
      node.gType = this.graphDataConf[i].gType;
      node.graphConf = this.graphDataConf[i].graphConf;

      node.subtitle = this.graphDataConf[i].subTitle;
      if (i === 0) {node.data = this.BA;}
      else if (i === 1) {node.data = this.FC;}
      else if (i === 2) {node.data = this.APP;}
      else if (i === 3) {node.data = this.PRO;}
      else if (i === 4) {node.data = this.CLI;}
      else if (i === 5) {node.data = this.PRV;}
      node.data.fieldName = '#SAST Request';
      this.graphsInfo.push(node);
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit.ngAfterViewInit');
  }

  resetGraphView() {
    console.log('ngAfterViewInit.resetGraphView');
    //    let temp_max = [23, 24, 25];
    //    let temp_min = [12, 13, 12];
    //    let alldates = ['d1', 'd2', 'd3'];
    //    let weatherDates = ['d1'];


    for (let i = 0; i < this.MAX_CHARTS; i++) {
      this.graphsInfo[i].graph = new Chart('iCanvas_' + i, {
        type: this.graphsInfo[i].gType, // pie, line,  'bar',
        data: {
          labels: this.graphsInfo[i].data.classes,
          datasets: [
            {
              label: this.graphsInfo[i].data.fieldName,
              data: this.graphsInfo[i].data.classCount,
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              fill: true
            }
          ]
        },
        options: this[this.graphsInfo[i].graphConf.toString()](i) // Eye to the data!!!!
      });
      console.log("Show classes--->", this.graphsInfo[i].data.classes);
      console.log("Show values--->", this.graphsInfo[i].data.classCount);
      console.log("Show classes--->", this.graphsInfo[i].data.fieldName);
    }
  }

  ngOnInit() { // ngAfterViewInit

    console.log('DashboardComponent.ngOnInit');
    this.getRequestList();

  }

  getRequestList(): void {
    this.requestService.getAll().subscribe(
      sastRequestList => this.getRequestList_CB(sastRequestList)
    );
  }



  getRequestList_CB(reqList: SASTRequest[]): void {

    for (let i = 0; i < reqList.length; i++) {
      this.BA.addValue(reqList[i].PM_BA);
      this.FC.addValue(reqList[i].PM_FC);
      this.PRO.addValue(reqList[i].P_PRO);
      this.USER.addValue('[' + reqList[i].PM_UID + ']-' + reqList[i].PM_FN + reqList[i].PM_LN);
      this.APP.addValue(reqList[i].P_APP);
      this.CLI.addValue(reqList[i].P_CLI);
      this.PRV.addValue(reqList[i].P_PROV);
    }

    this.requestList = reqList;

    // Make calculations
    this.BA.makeCalcs();
    this.FC.makeCalcs();
    this.PRO.makeCalcs();
    this.APP.makeCalcs();
    this.USER.makeCalcs();
    this.PRV.makeCalcs();
    this.CLI.makeCalcs();
    // View must be loaded before call this method
    this.resetGraphView();
    this.SHOW_CHARTS = 1;
  }

}





