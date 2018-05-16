import {Chart} from 'chart.js';
import {Component, OnInit, AfterViewInit} from '@angular/core';
//import 'rxjs/add/operator/map';
//let _ = require('lodash');
import * as _ from 'lodash';

import {Kiuwanapplication} from '../classes/kiuwanapplication';
import {KiuwanApplicationService, KiuwanStatisticsData, KiuwanStatisticData} from '../_services/kiuwan.application.service';
import {ClientRequestProviderService} from '../_services/clientrequestprovider.service';

import {User} from '../_user/user';                     /* @aaa   Listado de usuarios */
import {GeneralStatistisc, DashBoardGraphInfoNode} from '../classes/generalstatistisc';
import {SASTRequest} from '../classes/sastrequest';
import {MessageService} from '../message.service';
import { error } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
// import {UserService} from '../_services/index';         /* @aaa   Listado de usuarios */


@Component({
  // moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  currentUser: User;

  private APP: GeneralStatistisc = new GeneralStatistisc();
  private CLI: GeneralStatistisc = new GeneralStatistisc();
  private PRO: GeneralStatistisc = new GeneralStatistisc();
  private TEC: GeneralStatistisc = new GeneralStatistisc();
  private FC: GeneralStatistisc = new GeneralStatistisc();
  private BA: GeneralStatistisc = new GeneralStatistisc();
  private PRV: GeneralStatistisc = new GeneralStatistisc();
  private DESC: GeneralStatistisc = new GeneralStatistisc();
  private MPRO: GeneralStatistisc = new GeneralStatistisc();
  private LAB: GeneralStatistisc = new GeneralStatistisc();

  private MAX_CHARTS = 10;
  private SHOW_CHARTS = 0;
  private graphsInfo: DashBoardGraphInfoNode[] = [];

  private requestList: SASTRequest[];
  private statidistics : KiuwanStatisticsData;

  private dataToShow : String;

  private changeData(){
    if (this.dataToShow ===  'SAST Light Request' ){
      this.dataToShow =  'Kiuwan Applications';
      this.getKiuwanStatistics();
    }else if (this.dataToShow ===  'Kiuwan Applications' ){
      this.dataToShow =  'SAST Light Request';
      this.getRequestList();
    }

  }

  private graphDataConf = [

    // Gráfica de peticiones por Aplicación
    {title: 'Application', subTitle:  ' by Application', label: 'SAST Light Request', gType: 'pie', graphConf: '_PIE_GRAPH_CONF'},
    // Gráfica de peticiones por cliente
    {title: 'Client', subTitle:  '  by client', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por proyecto
    {title: 'Project', subTitle: ' by Project', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por tecnología
    {title: 'Tecnología', subTitle: ' by Technology', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por Comunidad Funcional
    {title: 'Functional Comunity', subTitle: ' by Functional Comunity', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por Bussines Área
    {title: 'Bussines Area', subTitle: ' by Bussines Area', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por proveedor
    {title: 'Provider', subTitle: ' by Provider', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por descripción
    {title: 'Description', subTitle: ' by Description', label: 'SAST Light Request', gType: 'bar', graphConf: '_PIE_GRAPH_CONF'},
    // Gráfica de peticiones por main project
    {title: 'Main Project', subTitle: ' by MProject', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
    // Gráfica de peticiones por laboratorio
    {title: 'Laboratory', subTitle: ' by Laboratory', label: 'SAST Light Request', gType: 'bar', graphConf: '_BAR_GRAPH_CONF'},
];

  constructor(
    private kiuSrv: KiuwanApplicationService,
    private messageService: MessageService,
    private requestService: ClientRequestProviderService,
    private router: Router,
    private route: ActivatedRoute
    // private userService: UserService                    /* @aaa   Listado de usuarios */
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.initalizeGraphInfo();
  }


  private _BAR_GRAPH_CONF(i: number): any {
    console.log("----------------------------------------->", this.graphsInfo[i].data.min, this.graphsInfo[i].data.max );
    return {
      fullWidth : true,
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          display: true,
          categorySpacing: 0,
          maxBarThickness: 50,
          categoryPercentage: 1,
          barPercentage: 0.4,
          autoSkip: false
        }],
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: (this.graphsInfo[i].data.min - 1 <= 0) ? 0 : this.graphsInfo[i].data.min - 1,
            max: this.graphsInfo[i].data.max+1,
            //beginAtZero:true
          }
        }]
      },
      legendCallback: function(chart) {
        // Return the HTML string here.
        return '<div>legend!!!!!!!!!!!!!!!!!!!!!!!!!</div>'
      }
    };
  }

  private _PIE_GRAPH_CONF(i: number): any {
    return {
      responsive : true,
      rotation: -Math.PI,
      cutoutPercentage: 30,
      circumference: Math.PI,
      legend: {
        display: true,
        position: 'bottom'
      },
      animation: {
        animateRotate: true,
        animateScale: true
      },
      legendCallback: function(chart) {
        // Return the HTML string here.
        return '<div>legend!!!!!!!!!!!!!!!!!!!!!!!!!</div>'
      }
    };
  }

  initalizeGraphInfo(): void {
    for (let i = 0; i < this.MAX_CHARTS; i++) {
      let node = new DashBoardGraphInfoNode();
      node.index = i;
      node.title = this.graphDataConf[i].title;
      node.gType = this.graphDataConf[i].gType;
      node.graphConf = this.graphDataConf[i].graphConf;
      node.subtitle = this.graphDataConf[i].subTitle;
      if (i === 0)      {node.data = this.APP;}
      else if (i === 1) {node.data = this.CLI;}
      else if (i === 2) {node.data = this.PRO;}
      else if (i === 3) {node.data = this.TEC;}
      else if (i === 4) {node.data = this.FC;}
      else if (i === 5) {node.data = this.BA;}
      else if (i === 6) {node.data = this.PRV;}
      else if (i === 7) {node.data = this.DESC;}
      else if (i === 8) {node.data = this.MPRO;}
      else if (i === 9) {node.data = this.LAB;}
      node.data.fieldName = '#SAST Request';
      this.graphsInfo.push(node);
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  resetGraphView() {
    console.log(' ');
    for (let i = 0; i < this.MAX_CHARTS; i++) {
      let gphInfo;
      // Labels must have a maximun length????  //@aaa @TODO
      for ( let iAux=0; iAux < this.graphsInfo[i].data.classes.length; iAux++){
        this.graphsInfo[i].data.classes[iAux] =  
          this.graphsInfo[i].data.classes[iAux].substr(0,10);
      }

      if( this.graphsInfo[i].gType === 'bar'){
        gphInfo= {
          type: this.graphsInfo[i].gType, // pie, line,  'bar',
          data: {
            labels: this.graphsInfo[i].data.classes,
            datasets: [
              {
                label: this.dataToShow,//this.graphsInfo[i].data.fieldName.substring(0,8),
                data: this.graphsInfo[i].data.classCount,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                fill: true
              }
            ]
          },
          options: this[this.graphsInfo[i].graphConf.toString()](i) // Eye to the data!!!!
        }
      };
      if( this.graphsInfo[i].gType === 'pie' ){
        gphInfo= {
          type: this.graphsInfo[i].gType, // pie, line,  'bar',
          data: {
            labels: this.graphsInfo[i].data.classes,
            datasets: [
              {
                label: "R | APP",//this.graphsInfo[i].data.fieldName.substring(0,8),
                data: this.graphsInfo[i].data.classCount,
                //backgroundColor: "rgba(255,99,132,0.2)",
                
                //borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                fill: true,
                borderColor: [
                  "rgba(255,99,132,1)",
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ]
              }
            ]
          },
          options: this[this.graphsInfo[i].graphConf.toString()](i) // Eye to the data!!!!
        }
      }
      if(!this.graphsInfo[i].graph){
        this.graphsInfo[i].graph = new Chart( ('iCanvas_' + i), gphInfo);
        this.graphsInfo[i].graph.generateLegend();
      }else{
        this.graphsInfo[i].graph.config.data = gphInfo.data;
        this.graphsInfo[i].graph.options = gphInfo.options;
        this.graphsInfo[i].graph.generateLegend();
        this.graphsInfo[i].graph.update();
      }
    }
  }

  
  getKiuwanStatistics(): void {
    console.log('_>getKiuwanStatistics');
    this.kiuSrv.getCompleteKiuwanStatistics().subscribe(
      data => {
        let compStat  = new KiuwanStatisticsData(); 
        compStat.APP  = <KiuwanStatisticData[]>data[0];
        compStat.CLI  = <KiuwanStatisticData[]>data[1];
        compStat.PRO  = <KiuwanStatisticData[]>data[2];
        compStat.TEC  = <KiuwanStatisticData[]>data[3];
        compStat.FC   = <KiuwanStatisticData[]>data[4];
        compStat.BA   = <KiuwanStatisticData[]>data[5];
        compStat.PRV  = <KiuwanStatisticData[]>data[6];
        compStat.DESC = <KiuwanStatisticData[]>data[7];
        compStat.MPRO = <KiuwanStatisticData[]>data[8];
        compStat.LAB  = <KiuwanStatisticData[]>data[9];
          this.statidistics = compStat;
      },
      error => {
        console.log('_>getKiuwanStatistics ERROR=', error );
      },
      () => {
        this.makeCalcsStat( );
        this.resetGraphView(); 
      }
    );    
  }

  makeCalcsStat(){
    console.log(  "makeCalcsStat. Object=",  this.statidistics.BA );
    this.APP.clearValues();
    this.CLI.clearValues();
    this.PRO.clearValues();
    this.TEC.clearValues();
    this.FC.clearValues();
    this.BA.clearValues();
    this.PRV.clearValues();
    this.DESC.clearValues();
    this.MPRO.clearValues();
    this.LAB.clearValues();

    for (let entry in this.statidistics) {
      let key : string;
      key = entry.toString(); // APP PRO CLI FC TEC BA --> all KiuwanStatisticData in KiuwanStatisticsData
      let keyVals = this.statidistics[key];
      for ( var i = 0 ; i < keyVals.length; i++ ){
        let item = this.statidistics[key][i];
        for ( var j = 0 ; j < item.count; j++ ){
          let refToSta : GeneralStatistisc= <GeneralStatistisc>this[key];
          refToSta.addValue(item._id);
        } 
      }
    }

    this.APP.makeCalcs();
    this.CLI.makeCalcs();
    this.PRO.makeCalcs();
    this.TEC.makeCalcs();
    this.FC.makeCalcs();
    this.BA.makeCalcs();
    this.PRV.makeCalcs();
    this.DESC.makeCalcs();
    this.MPRO.makeCalcs();
    this.LAB.makeCalcs();
  }

  getRequestList(): void {
    this.requestService.getAll().subscribe(
      sastRequestList => this.getRequestList_CB(sastRequestList)
    );
  }

  getRequestList_CB(reqList: SASTRequest[]): void {

    this.APP.clearValues();
    this.CLI.clearValues();
    this.PRO.clearValues();
    this.TEC.clearValues();
    this.FC.clearValues();
    this.BA.clearValues();
    this.PRV.clearValues();
    this.DESC.clearValues();
    this.MPRO.clearValues();
    this.LAB.clearValues();

    for (let i = 0; i < reqList.length; i++) {
      this.BA.addValue(reqList[i].PM_BA);
      this.FC.addValue(reqList[i].PM_FC);
      this.PRO.addValue(reqList[i].P_PRO);
      this.TEC.addValue('[' + reqList[i].PM_UID + ']-' + reqList[i].PM_FN + reqList[i].PM_LN);
      this.APP.addValue(reqList[i].P_APP);
      this.CLI.addValue(reqList[i].P_CLI);
      this.PRV.addValue(reqList[i].P_PROV);
      this.DESC.addValue(reqList[i].P_DES);
      //this.MPRO.addValue(reqList[i].P_PROV);
      //this.LAB.addValue(reqList[i].P_PROV);

    }

    this.requestList = reqList;

    // Make calculations
    this.BA.makeCalcs();
    this.FC.makeCalcs();
    this.PRO.makeCalcs();
    this.APP.makeCalcs();
    this.TEC.makeCalcs();
    this.PRV.makeCalcs();
    this.CLI.makeCalcs();
    this.DESC.makeCalcs();
    // View must be loaded before call this method
    this.resetGraphView();
    this.SHOW_CHARTS = 1;
  }

  showDetailGraph( title ){
    console.log('---------------------------------->showDetailGraph', title);
    for (let i = 0; i < this.MAX_CHARTS; i++) {
      let gphInfo;
      if( this.graphsInfo[i].title === title ){
        localStorage.setItem('GRAPH_DATA_DETAIL', JSON.stringify( 
           _.omit(this.graphsInfo[i], 'graph') 
        ));
      }
    }
    this.router.navigate(['/dashboard/detail/'+title], { relativeTo: this.route } );
  }


  ngOnInit() { // ngAfterViewInit

    console.log('DashboardComponent.ngOnInit');
    this.dataToShow = 'SAST Light Request';
    this.getRequestList();
    //this.getKiuwanStatistics( );
  }
}

