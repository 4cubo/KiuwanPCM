import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable()
export class FoDService {



  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
    console.log("Constructor de FoDService[Service]"); //@aaa delete
  }

  token = "";
  //obj.fortifyAPIUrl= "https://api.emea.fortify.com/api/v3";

  setSecToken(tokeni: string) {
    //console.log(" FORTIFY TOKEN=" + tokeni);
    this.token = tokeni;
  }

  // Request contains only .url & .method attibutes
  getObject(req : FodProxyRequest): Observable<any> { //TODO Change to postFoDRequest

    let data = {
      method: req.method,
      url: req.url,
      headers: { // Headers for fortify
        'Authorization': 'Bearer ' + this.token,
        'Accept': 'application/json',
        'fodcol': req.fodcol
      },
      body: {}
    };

    return this.http.post<any>(appConfig.apiUrl + '/fod', data).map(
      kiuData => {
        console.log('Lista de objetos recibida:', kiuData);
        //this.appList = kiuApps;
        return kiuData;
      }
    );

  };

}
export class FodProxyRequest {
  method: string;
  url: string;
  fodcol: string;
}

export class FoDAppAPIResponse {
  items: FoDApplication[];
  totalCount: number;
}
export class FoDRelAPIResponse {
  items: FoDReleasse[];
  totalCount: number;
}
export class FoDVulAPIResponse {
  items: FoDVulnerability[];
  totalCount: number;
}

export class FoDApplication {
  applicationId: string;
  applicationName: string;
  applicationDescription: string;
  applicationCreatedDate: string;
  businessCriticalityTypeId: string;
  businessCriticalityType: string;
  emailList: string;
  applicationTypeId: string;
  applicationType: string;
  attributes: [
    {
      name: string;
      id: string;
      value: string;
    }
  ];
}

export class FoDReleasse {
  releaseId: string;
  releaseName: string;
  releaseDescription: string;
  releaseCreatedDate: string;
  microserviceName: string;
  applicationId: string;
  applicationName: string;
  currentAnalysisStatusTypeId: string;
  currentAnalysisStatusType: string;
  rating: string;
  critical: string;
  high: string;
  medium: string;
  low: string;
  currentStaticScanId: string;
  currentDynamicScanId: string;
  currentMobileScanId: string;
  staticAnalysisStatusType: string;
  dynamicAnalysisStatusType: string;
  mobileAnalysisStatusType: string;
  staticAnalysisStatusTypeId: string;
  dynamicAnalysisStatusTypeId: string;
  mobileAnalysisStatusTypeId: string;
  staticScanDate: string;
  dynamicScanDate: string;
  mobileScanDate: string;
  issueCount: string;
  isPassed: string;
  passFailReasonTypeId: string;
  passFailReasonType: string;
  sdlcStatusTypeId: string;
  sdlcStatusType: string;
}

export class FoDVulnerability {
  id: string;
  releaseId: string;
  fisma: string;
  severityString: string;
  severity: string;
  category: string;
  kingdom: string;
  owasp2004: string;
  owasp2007: string;
  owasp2010: string;
  owasp2013: string;
  owasp2017: string;
  cwe: string;
  package: string;
  primaryLocation: string;
  vulnId: string;
  analysisType: string;
  lineNumber: string;
  hasComments: string;
  assignedUser: string;
  scantype: string;
  subtype: string;
  primaryLocationFull: string;
  hasAttachments: string;
  pci1_1: string;
  pci1_2: string;
  pci2: string;
  sans2009: string;
  sans2010: string;
  sans2011: string;
  wasc24_2: string;
  isSuppressed: string;
  scanId: string;
  pci3: string;
  instanceId: string;
  auditPendingAuditorStatus: string;
  auditorStatus: string;
  checkId: string;
  closedDate: string;
  closedStatus: string;
  developerStatus: string;
  PositiveChallenge: string;
  introducedDate: string;
  scanStartedDate: string;
  scanCompletedDate: string;
  status: string;
  bugSubmitted: string;
  bugLink: string;
  auditPendingSuppression: string;
}