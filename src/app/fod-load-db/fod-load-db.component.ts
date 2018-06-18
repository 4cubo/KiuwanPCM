import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FoDApplication, FoDService, FoDAppAPIResponse, FodProxyRequest, FoDReleasse, FoDRelAPIResponse, FoDVulnerabilityAllData } from '../_services/fortify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FodAppListMsgService } from '../fod-app-list/fod-app-list-msg.service';


@Component({
  selector: 'app-fod-load-db',
  templateUrl: './fod-load-db.component.html',
  styleUrls: ['./fod-load-db.component.css']
})
export class FodLoadDbComponent implements OnInit {

    //If both are 0, from start to end, else, onlñy load apps from  __APP_INIT to __APP_END in the load proccess
    __APP_INIT = 140;
    __APP_END  = 401;

  status: string;

  //getAllApps
  appList: string[] = [];
  appCount = 0;
  appOffset = 0;
  appLimit = 50;
  appLoadedCount = 0;

  //getAllAppRel
  relList: string[] = [];
  relCount = 0;
  relOffset = 0;
  relLoadedCount = 0;

  //getVulnerabilities
  vulList: { releaseId: string, id: string }[] = [];
  vulCount = 0;
  vulOffset = 0;
  vulLimit = 50;
  vulLoadedCount = 0;

  //getVulnerabily
  vulnerability: FoDVulnerabilityAllData;

  constructor(
    private foD: FoDService,
    private router: Router,
    private actRoute: ActivatedRoute,
    public fodMsgPanelSrv: FodAppListMsgService,
  ) { }

  ngOnInit() {
    if (this.isOk(this.fodMsgPanelSrv.status.token)) {
      this.fodMsgPanelSrv.add("Valid token, initialising Fortify conection ");
      this.setFoDSvcToken();
    } else {
      this.fodMsgPanelSrv.add("Invalid token, please fill with correct one");
    }
  }

  isOk(obj: Object) { // In typeScript, obj != null, old school JavaScript  
    return (typeof obj !== 'undefined' && obj != null);
  }

  setFoDSvcToken() {
    if (this.isOk(this.fodMsgPanelSrv.status.token)) {

      this.foD.setSecToken(this.fodMsgPanelSrv.status.token);
      this.status = "Loading applications";
      this.getAllApps(null, true); // void req & init  control data

    }
  }

  clearFoDError() {
    this.fodMsgPanelSrv.status.errorString = "";
    this.fodMsgPanelSrv.status.error = false;
  }

  logFoDError(result) {
    if (this.isOk(result.errorCode)) {
      this.fodMsgPanelSrv.status.errorString = "uFocus FoD ERROR Code=" + result.errorCode + " : "
        + result.message + " HTTP CODE=" + result.responseCode;
      console.log(this.fodMsgPanelSrv.status.errorString);
    } else if (this.isOk(result.errors)) {
      this.fodMsgPanelSrv.status.errorString = "uFocus FoD ERROR Code=" + result.errors[0].errorCode + " : "
        + result.errors[0].message;
      console.log(this.fodMsgPanelSrv.status.errorString);
    } else if (this.isOk(result.status) && (result.status == 404 || result.status == 401)) {
      this.fodMsgPanelSrv.status.errorString = "HTTP ERROR Code=" + result.status + " msg: " + result.message;
    } else if (this.isOk(result.status) && (result.status == 503)) {
      this.fodMsgPanelSrv.status.errorString = " Fortify is unavailable: status code=" + result.status + " Message: " + result.message;
    } else {
      this.fodMsgPanelSrv.status.errorString = "Default FoD Error Message. If seen check FoDController.logFoDError() function"
      console.log('FoD Error = ', result);
    }
    this.fodMsgPanelSrv.status.error = true;
    this.fodMsgPanelSrv.status.loadedCount = 0;
    this.fodMsgPanelSrv.status.totalCount = 0;
  }



  getAllApps(req: FodProxyRequest = null, initInfo: boolean = false) {
    if (initInfo) {
      console.log("app-fod-load-db.getAllApps: START DONWLOADING FoD DB");
      console.log("START APPLICATIONS==================================");
      this.appOffset = 0;
      this.clearFoDError();
      this.appLoadedCount = 0;
      //this.appList = [];
      this.appCount = 0;
    }

    //Prepare url for first or next block
    if (req == null) {
      req = new FodProxyRequest();
      req.method = 'GET';
      req.url = "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit;
      req.fodcol = 'fod_apps';
    }
    
    this.foD.getObject(req).subscribe(
      data => {
        data as FoDAppAPIResponse;
        this.fodMsgPanelSrv.status.error = false;
        for (var item in data.items) {
          this.appList.push(data.items[item].applicationId);
        }

        this.appLoadedCount += data.items.length;
        this.appCount = data.totalCount;

      },
      error => {
        this.logFoDError(error);

      },
      () => {
        this.fodMsgPanelSrv.status.loadedCount = this.appLoadedCount;
        this.fodMsgPanelSrv.status.totalCount = this.appCount;
        //Check if there are more apps not loaded
        if ( this.appCount > this.appLoadedCount) {
          this.fodMsgPanelSrv.add("Load next application page: " + this.appLoadedCount + "/" + this.appCount);
          console.log("\tapp-fod-load-db.getAllApps:  Load next appliocation page: " + this.appLoadedCount + "  " + this.appCount);
          this.appOffset = this.appOffset + this.appLimit;

          //this.getAllAppsNextBlock();
          req.url = "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit;
          console.log('--------->', req);
          this.getAllApps(req, false);
        } else {
          console.log("app-fod-load-db.getAllApps: #app=", this.appList.length);
          console.log("END APPLICATIONS====================================");
          if(this.__APP_END == 0 && this.__APP_INIT  == 0 ){
            this.currentAppLoadingRel = 0;
            this.__APP_END =  this.appList.length;
            console.log("\t\t LOAD ALL APPLICATIONS DATA" );
          }else{
            this.currentAppLoadingRel = this.__APP_INIT-1;
            console.log("\t\t LOAD APPLICATIONS FROM ", this.__APP_INIT, " TO ", this.__APP_END );
          }

          this.status = "Loading releasses of ", (this.__APP_END - this.__APP_INIT), " applications";
          console.log("app-fod-load-db.getAllApps: calls getNextApplicationReleassess currentAppLoadingRel=", this.currentAppLoadingRel);
          console.log("START RELEASSES=====================================");
          this.getNextApplicationReleassess()
        }
      }
    );


  }

  currentAppLoadingRel: number = 0;
  getNextApplicationReleassess() {
    if (this.currentAppLoadingRel >= this.__APP_END) {
      console.log("\tapp-fod-load-db.getNextApplicationReleassess: end releasses, #rel=", this.appList.length);
      console.log("END RELEASSES=======================================");
      console.log("START  VULNERABILITIES==============================");
      this.currentRelLoadingVul = 0;
      this.getNextReleaseVulnerabilities();
    } else {
      let currentAppId = this.appList[this.currentAppLoadingRel];
      this.currentAppLoadingRel++;
      //console.log(item); 
      console.log("\tapp-fod-load-db.getNextApplicationReleassess: calls getApplicationReleasses for app with  id=", currentAppId, "   ", this.currentAppLoadingRel, " / ", this.appList.length, "   ", (this.__APP_END - this.__APP_INIT)  );
      this.getApplicationReleasses(currentAppId, null, true);
    }
  }

  getApplicationReleasses(appId: string, req: any = null, initInfo: boolean = false) {
    if (initInfo) {
      this.relOffset = 0;
      this.clearFoDError();
      this.relLoadedCount = 0;
      //this.relList = [];
      this.relCount = 0;
    }
    //Prepare url for first or next block
    if (req == null) {
      req = new FodProxyRequest();
      req.method = 'GET';
      req.url = "/applications/" + appId + "/releases?orderBy=releaseCreatedDate&orderByDirection=DESC&offset=" + this.relOffset + "&limit=" + this.appLimit;
      req.fodcol = 'fod_rels';
    }
    this.foD.getObject(req).subscribe(
      data => {
        data as FoDRelAPIResponse;
        for (var item in data.items) {
          this.relList.push(data.items[item].releaseId);
        }
        this.relLoadedCount += data.items.length;
        this.relCount = data.totalCount;
      },
      error => {
        this.logFoDError(error);
      },
      () => {
        //Check if there are more apps not loaded
        if (this.relCount > this.relLoadedCount) {
          console.log(" fod-app-rel-list.getAllAppRel: Cargar siguiente paquete: " + this.relCount + "  " + this.relLoadedCount);
          this.relOffset = this.relOffset + this.appLimit;
          req.url = "/applications/" + appId + "/releases?orderBy=releaseCreatedDate&orderByDirection=DESC&offset=" + this.relOffset + "&limit=" + this.appLimit;
          console.log('--------->', req);
          this.getApplicationReleasses(appId, req, false);
        } else {
          this.getNextApplicationReleassess();
        }
      }
    );
  }

  currentRelLoadingVul: number = 0;
  getNextReleaseVulnerabilities() {
    if (this.currentRelLoadingVul >= this.relList.length) {
      console.log("\tapp-fod-load-db.getNextReleaseVulnerabilities: end vulnerabilities, #vul=", this.vulList.length);
      console.log("END  VULNERABILITIES================================");
      console.log("START  VULNERABILITIES  DETAIL======================");
      this.currentVulLoadingDetail = 0;
      this.getNextVulnerabilityDetails();
    } else {
      let item = this.relList[this.currentRelLoadingVul];
      this.currentRelLoadingVul++;
      console.log("\tapp-fod-load-db.getNextReleaseVulnerabilities: calls getReleaseVulnerabilities for rel with  id=", item, "   ", this.currentRelLoadingVul, " / ", this.vulList.length);
      console.log(item);
      this.getReleaseVulnerabilities(item, null, true);
    }
  }

  getReleaseVulnerabilities(relId: string, req: any = null, initInfo: boolean = false) {
    if (initInfo) {
      this.vulOffset = 0;
      this.clearFoDError();
      this.vulLoadedCount = 0;
     // this.vulList = [];
      this.vulCount = 0;
    }
    //Prepare req.url for first or next block
    if (req == null) {
      req = new FodProxyRequest();
      req.method = 'GET';
      req.url = "/releases/" + relId + "/vulnerabilities?orderBy=severity&orderByDirection=DESC&offset=" + this.vulOffset + "&limit=" + this.vulLimit;
      req.fodcol = 'fod_vuls';
    }
    this.foD.getObject(req).subscribe(
      data => {
        data as FoDAppAPIResponse;
        for (var item in data.items) {
          this.vulList.push({ releaseId: data.items[item].releaseId, id: data.items[item].vulnId });
        }
        this.vulLoadedCount += data.items.length;
        this.vulCount = data.totalCount;
      },
      error => {
        this.logFoDError(error);
      },
      () => {
        if (this.vulCount > this.vulLoadedCount) {
          console.log(" FoDController.getVulnerabilities: Cargar siguiente paquete: " + this.vulCount + "  " + this.vulLoadedCount);
          this.vulOffset = this.vulOffset + this.vulLimit;
          req.url = "/releases/" + relId + "/vulnerabilities?orderBy=severity&orderByDirection=DESC&offset=" + this.vulOffset + "&limit=" + this.vulLimit;
          console.log('--------->', req);
          this.getReleaseVulnerabilities(relId, req, false);
        } else {
          this.getNextReleaseVulnerabilities();
        }
      }
    );
  }

  currentVulLoadingDetail: number = 0;
  getNextVulnerabilityDetails() {
    if (this.currentVulLoadingDetail < this.vulList.length) {
      console.log("\t\tLOADING DETAILS FOR ", this.currentVulLoadingDetail, "/", this.vulList.length, "  rel=",  this.vulList[this.currentVulLoadingDetail].releaseId , " vul=", this.vulList[this.currentVulLoadingDetail].id);
      this.getVulnerabilityDetails(this.vulList[this.currentVulLoadingDetail].releaseId, this.vulList[this.currentVulLoadingDetail].id);
      this.currentVulLoadingDetail++;
    } else {
      console.log("END  VULNERABILITIES DELTAILS================================");
    }
  }


  getVulnerabilityDetails(relId: string, vulId: string) {
    let req: any = null;
    this.vulnerability = null;
    //Prepare req.url GET /api/v3/releases/{releaseId}/vulnerabilities/{vulnId}/all-data
    if (req == null) {
      req = new FodProxyRequest();
      req.method = 'GET';
      req.url = "/releases/" + relId + "/vulnerabilities/" + vulId + "/all-data";
      req.fodcol = 'fod_vuls_comp';
    }

    this.foD.getObject(req).subscribe(
      data => {
        var foDVulAllDataAPIResponse = data as FoDVulnerabilityAllData;
        this.vulnerability = foDVulAllDataAPIResponse;
      },
      error => {
        this.logFoDError(error);
      },
      () => {
        this.getNextVulnerabilityDetails();
      }
    );
  }

}
