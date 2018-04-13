import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';

import {Application} from '../classes/application';
import {MOCK_APPLICATIONS} from '../mock-applications'; //@aaa mock-applications

import {MessageService } from '../message.service';

@Injectable()
export class ClientRequestProviderService {

  constructor(
      private messageService: MessageService,
      private http: HttpClient
  ) {
    console.log("Constructor de ClientRequestProviderService"); //@aaa delete
  }

  applications: Application[] = MOCK_APPLICATIONS; //@aaa mock-applications

  saveRequest( requestData ){
    console.log("ClientRequestProviderService:saveRequest calling http server...." + JSON.stringify(requestData)); //@aaa delete
    return this.http.post(appConfig.apiUrl + '/uploadFile/saveRequest', requestData);
  }

  getApplications(): Observable<Application[]> {
    // Todo: send the message _after_ fetching the applications
    this.messageService.add('ClientRequestProviderService: resolving applications');

    return of(MOCK_APPLICATIONS);
  }

  getApplication(id: number): Observable<Application> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`ClientRequestProviderService: fetched application id=${id}`);
    return of(MOCK_APPLICATIONS.find(app => app.id === id));
  }

}
