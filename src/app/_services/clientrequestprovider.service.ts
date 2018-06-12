import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {appConfig} from '../app.config';

//(import {KiuwanApplication} from '../classes/kiuwanapplication';
import {SASTRequest} from '../classes/sastrequest';
import { MessageService } from './message.service';



export class SASTRequestSaveResponse {
  result: number;
  dbId: string;
  SASTId: string;
}


@Injectable()
export class ClientRequestProviderService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
    console.log("Constructor de ClientRequestProviderService"); //@aaa delete
  }

  saveRequest(requestData) {
    console.log("ClientRequestProviderService:saveRequest calling http server...." + JSON.stringify(requestData)); //@aaa delete
    return this.http.post<SASTRequestSaveResponse>(appConfig.apiUrl + '/uploadFile/saveRequest', requestData);
  }

  getAll() {
    // Todo: send the message _after_ fetching the applications
    this.messageService.add('ClientRequestProviderService.getAll');
    return this.http.get<SASTRequest[]>(appConfig.apiUrl + '/request');
  }

  /* Returns an array of strings containing all factories involved in all Request*/
  getAllFactories() {
    this.messageService.add('ClientRequestProviderService.getAll');
    return this.http.get<string[]>(appConfig.apiUrl + '/request');
  }

  getById(_id: string) {
    this.messageService.add(`ClientRequestProviderService.getById: id=${_id}`);
    return this.http.get(appConfig.apiUrl + '/request/' + _id);
  }

}
