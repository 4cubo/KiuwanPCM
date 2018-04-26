import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Kiuwanapplication} from '../classes/kiuwanapplication';
import {MessageService} from '../message.service';
import {appConfig} from '../app.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class KiuwanApplicationService {

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


  getApplications(): Observable<Kiuwanapplication[]> {

    // Todo: send the message _after_ fetching the applications
    this.messageService.add('Kiuwan App Service: getApplications');

    if (this.applications) {
      console.log('----------------------------_>Recuerado aplicaciones kiuwan del servicio');
      return of(this.applications);
    }
    let apps: Kiuwanapplication[] =  // @aaa @TODO Do not use LocalStorage in the future, session storage or server mongo instead
      JSON.parse(localStorage.getItem('KiuwanApplications'));
    if (apps) {
//      for (let i = 0; i < apps.length; i++) {
//        apps[i].explodeData();
//      }
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


    return this.http.post<any>(appConfig.apiUrl + '/kiuwan', data)
      .map(kiuApps => {
        console.log('Lista de apps recibida:', kiuApps);
        for (let i = 0; i < kiuApps.length; i++) {
          let item : Kiuwanapplication  = kiuApps[i] as Kiuwanapplication;
          console.log ("--------->", item);
          Kiuwanapplication.explodeData(item);
        }
        localStorage.setItem('KiuwanApplications', JSON.stringify(kiuApps));
        this.applications = kiuApps;
        return kiuApps;
      });

  }


  // Return analisys and last_analisys
  getApplication(name: string): Observable<Kiuwanapplication> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`ApplicationProviderService: fetched application name=${name}`);
    //    return of(MOCK_APPLICATIONS.find(app => app.id === id));

    let result: Kiuwanapplication;
    this.getApplications().subscribe(
      apps => {
        result = apps.find(app => app.name === name);
      }
    );
    // Return a promise
    return of(result);
  }

}
