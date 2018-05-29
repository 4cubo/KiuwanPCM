import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
//import {forkJoin} from 'rxjs/add/observable/forkJoin';
import {of} from 'rxjs/observable/of';

import {Kiuwanapplication, KiuwanApplicationAnalisys, KiuwanApplicationDelivery} from '../classes/kiuwanapplication';
import {MessageService} from '../message.service';
import {appConfig} from '../app.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class KiuwanApplicationService { // @aaa @TODO cambiar a KiuwanService

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
    console.log("Constructor de KiuwanApplicationService[Service]"); //@aaa delete
  }

  applications: Kiuwanapplication[]; //@aaa mock-applications

  kiuwanUser: string = '';
  kiuwanPasswd: string = '';


  setCredentials = function(userName, passwd) {
    console.log(" setCredentials:" + userName + "/" + passwd);
    this.kiuwanUser = userName;
    this.kiuwanPasswd = passwd;
    this.messageService.add('Kiuwan App Service: credentials configured');

  };

  //Gets applications from kiuwan or from Local Storage
  getApplications(): Observable<Kiuwanapplication[]> {

    //this.messageService.add('Kiuwan App Service: getApplications');

    if (this.applications) {
      console.log('----------------------------_>Recuerado aplicaciones kiuwan del propio servicio');
      return of(this.applications);
    }
    // @aaa @TODO Do not use LocalStorage in the future, session storage or server mongo instead
    let apps: Kiuwanapplication[] =  
      JSON.parse(localStorage.getItem('KiuwanApplications'));
    if (apps) {
      console.log('----------------------------_>Recuerado aplicaciones kiuwan del local storage');
      return of(apps);
    }

    console.log('----------------------------_>Recuerado aplicaciones kiuwan de kiuwan');

    let data = {
      method: 'GET',
      url: "/apps/list",
      headers: {
        'Authorization': 'Basic ' + window.btoa(this.kiuwanUser + ':' + this.kiuwanPasswd)
        // 'Target_URL': 'https://api.kiuwan.com',
        // 'Content-Type': 'application/json; charset=UTF-8'
      }
    };


    return this.http.post<Kiuwanapplication[]>(appConfig.apiUrl + '/kiuwan', data)
      .map(kiuApps => {
        console.log('Lista de apps recibida:', kiuApps);

        this.applications = kiuApps;
        return kiuApps;
      });

  }

  getApplicationAndReports(name: string): Observable<Kiuwanapplication> {
    let result: Kiuwanapplication;
    //let analisys: KiuwanApplicationAnalisys[];

    this.getApplications().subscribe(
      apps => {
        result =  apps.find(app => app.name === name);
      },
      ()=>{
        this.messageService.add(`KiuwanApplicationService:getApplication: fetched application name=${name}`);
      }
    );

    this.getApplicationsAnalisys(name).subscribe(
      appAna => {
        result.ANALISYS=  appAna;
      },
      ()=>{
        this.messageService.add(`KiuwanApplicationService:getApplication: fetched application analisys name=${name}`);
      }
    );

    this.getApplicationDeliverys(name).subscribe(
      appAna => {
        result.DELIVERIES=  appAna;
      },
      ()=>{
        this.messageService.add(`KiuwanApplicationService:getApplication: fetched application delivery  name=${name}`);
      }
    );
    
    //  LOAD METRICS!!!!

    
    // Return a promise
    return of(result);
    //return (result);
  }

  getApplicationsAnalisys( appName : string ): Observable<KiuwanApplicationAnalisys[]> {
    this.messageService.add('Kiuwan App Service: getApplicationsAnalisys');

    // @aaa @TODO Do not use LocalStorage in the future, session storage or server mongo instead
    
    let appAnalisys: KiuwanApplicationAnalisys[]=
      JSON.parse(localStorage.getItem('KiuwanApplicationAnalisys_' + encodeURI(appName)));
    
      if (appAnalisys) {
      this.messageService.add('getApplicationsAnalisys: Getting  ' + appName + ' analisys from local storage');
      return of(appAnalisys);
    }

    let data = {
      method: 'GET',
      url: '/apps/'+encodeURI(appName)+'/analyses',
      headers: {
        'Authorization': 'Basic ' + window.btoa(this.kiuwanUser + ':' + this.kiuwanPasswd)
      }
    };


    return this.http.post<KiuwanApplicationAnalisys[]>(appConfig.apiUrl + '/kiuwan', data)
      .map(kiuAppAnas => {
        console.log('Lista de analisis recibida:', kiuAppAnas);
        //this.applications = kiuApps;
        localStorage.setItem('KiuwanApplicationAnalisys_' + encodeURI(appName), JSON.stringify( kiuAppAnas) );
        return kiuAppAnas;
      });

  }

  getApplicationDeliverys( appName : string ): Observable<KiuwanApplicationDelivery[]> {
    this.messageService.add('Kiuwan App Service: getApplicationDeliveries');

    // @aaa @TODO Do not use LocalStorage in the future, session storage or server mongo instead
    
    let appAnalisys: KiuwanApplicationDelivery[]=
      JSON.parse(localStorage.getItem('KiuwanApplicationDelivery_' + encodeURI(appName)));
    if (appAnalisys) {
      console.log('----------------------------_>Recuperando deliveries de la app. kiuwan ', appName ,' de local storage');
      return of(appAnalisys);
    }

    console.log('----------------------------_>Recuperando deliveries app[', appName,'] de kiuwan');

    let data = {
      method: 'GET',
      url: '/apps/'+encodeURI(appName)+'/deliveries',
      headers: {
        'Authorization': 'Basic ' + window.btoa(this.kiuwanUser + ':' + this.kiuwanPasswd)
      }
    };


    return this.http.post<KiuwanApplicationDelivery[]>(appConfig.apiUrl + '/kiuwan', data)
      .map(kiuAppAnas => {
        console.log('Lista de deliveries recibida:', kiuAppAnas);
        //this.applications = kiuApps;
        localStorage.setItem('KiuwanApplicationDelivery_' + encodeURI(appName), JSON.stringify( kiuAppAnas) );
        return kiuAppAnas;
      });

  }

  getStatus(): Observable<any> {
    return this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/status')
    .map(result => {
      //console.log('Status datos cargados de Kiuwan:', result);
      return result;
    });
  }

  loadData(): Observable<any> {
    var url = appConfig.apiUrl + '/kiuwan/load?Authorization=' + encodeURI ('Basic ' + window.btoa(this.kiuwanUser + ':' + this.kiuwanPasswd))
    return this.http.get<any[]>( url )
    .map(result => {
      //  console.log('Status datos cargados de Kiuwan:', result);
      return result;
    });
  }

  getCompleteKiuwanStatistics( ) {
    return Observable.forkJoin(
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' + "$applicationPortfolios.Aplicacion") ,
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' + "$applicationPortfolios.Cliente"),
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' + "$applicationPortfolios.Proyecto"),
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' +  "$applicationPortfolios.Tecnologia"),
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' +  "$applicationPortfolios.Functional Community" ),
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' +  "$applicationPortfolios.Business Area" ),
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' +  "$applicationProvider" ),
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' +  "$descripcion" ),
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' +  "$applicationPortfolios.Main Project" ),
      this.http.get<any[]>(appConfig.apiUrl + '/kiuwan/statistics?agg=' +  "$applicationPortfolios.Laboratorio" )
    );
  }

}

export  class KiuwanStatisticData{
  _id : String;
  count: number;
  total: number;
  apps : String[];
  projects : String[];
}

export  class KiuwanStatisticsData{
  APP : KiuwanStatisticData[];
  CLI: KiuwanStatisticData[];
  PRO: KiuwanStatisticData[];
  TEC: KiuwanStatisticData[];
  BA: KiuwanStatisticData[];
  FC: KiuwanStatisticData[];
  PRV: KiuwanStatisticData[];
  DESC: KiuwanStatisticData[];
  MPRO: KiuwanStatisticData[];
  LAB: KiuwanStatisticData[]; 
}
