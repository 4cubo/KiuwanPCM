import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Application} from './application';
import {MOCK_APPLICATIONS} from './mock-applications'; //@aaa mock-applications
import {MessageService} from './message.service';

@Injectable()
export class ApplicationProviderService {

  constructor(private messageService: MessageService) {
    console.log("Constructor de ApplicationProviderService"); //@aaa delete
  }

  applications: Application[] = MOCK_APPLICATIONS; //@aaa mock-applications

  /*
  getApplications(): Application[] {
    return MOCK_APPLICATIONS;
  }*/

  getApplications(): Observable<Application[]> {
    // Todo: send the message _after_ fetching the applications
    this.messageService.add('ApplicationProviderService: fetched applications');

    return of(MOCK_APPLICATIONS);
  }

  getApplication(id: number): Observable<Application> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`ApplicationProviderService: fetched application id=${id}`);
    return of(MOCK_APPLICATIONS.find(app => app.id === id));
  }

}
