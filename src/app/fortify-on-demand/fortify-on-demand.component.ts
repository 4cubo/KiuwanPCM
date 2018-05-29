import { Component, OnInit } from '@angular/core';
import { FoDService } from '../_services/fortify.service';

@Component({
  selector: 'app-fortify-on-demand',
  templateUrl: './fortify-on-demand.component.html',
  styleUrls: ['./fortify-on-demand.component.css']
})
export class FortifyOnDemandComponent implements OnInit {

  loadingData = 0; //Number of http client open request


  appOffset = 0;
  appLimit = 50;
  userAppLoadedCount = 0;

  userAppList = [];
  userAppCount = 0;

  appPanelVisible = false;
  relPanelVisible = false;
  vulPanelVisible = false;

  search = "";
  search2 = "";
  search3 = "";

  fodErrorStr = "";
  showFoDError = false;

  appRelList = [];
  appRelCount = 0;

  relVulList = [];
  relVulListCount = 0;
  token: string;

  vulLimit = 50;
  relVulLoadedCount = 0;
  vulOffset = 0;

  selectedAppName: string;
  selectedRelId: string;
  selectedRow: number;

  constructor(
    private foD: FoDService
  ) { }

  ngOnInit() {
    this.token = "AAEAADEPMFWXA-2RNEeTDI6lwPPYpeTgNLSxzRsZK5W1zt6EMhcXtcwJ8jPMk2Zs6vBD78VCHRvpQf-20yb9t022LGhWfPZBuJZK_PUW6tLqk9ZKOmv1g0CykW1N9Zx5U-JUFdNoiLHDcVIs6w9B0jMWc9g_oMs3P1nbR_pUBZ10MjWk0UNfkKu-lxvbw-vnOcrBu2oaNSMywPhuj2JiI6ONOMWKIPJwPiGHwUYkrXLRfRsOUjT4ZXc4A-cGmJozkcOqR3nc4ncORbNZ8t3k--I8hoIZ9Bm3-89s1OkYRMCbTT7BULqpxzrexe31jN6y7kUX0Z-mDnkamqYk-Uud7_SsV7ZUAwAAAAEAAGT0NtIeLROpoABzLWrx4Z-Y-8YbS1tEXmhzOk_5GbF0L8WZUGiBfosmt3G7ucfuLPjW5CneSPRijYYlHEUGRWE1hgBZyTQl5El3iEUqpkr3mBvXD9HLDIkJR9DwcoPTFc_ww9dB1B0fHsD_9Iqrrml8fu371x0vGX0cPZcaJwkZTOXDBSpCpClQR9mnamdjxcNMihzr3VGqxKSTrH_CrJ0V597Fv4nW7DXC5RxWLt3PO1vdPPJDPUmCxS7QzcAWCiaiBRjfSzhkl2uOR0tmXhGVWjWXUodVYLA6IXh-F6XjQxWdRIyR9v7Uj8RxfibJrgWEmPCxE5Dwepg7CeUTY1jXGxUmycWGjmkZMTyqxYQCE0ERqSFfo-EaVCi0MdKanX2Ji0Bu4XmFtUa_nNL3JD6gpEHMuu3BH6mxpe1tCQclKfKm1CC6PqMQrc_pPACgNbJ_6A3rUhjfHbi68rOYi-Cjpd71FOtkJiPQl0HxQDqgSzGmdqesfD5HsB4OdgSwFX8nuk3QPaHyC0hyqsZX8sDcegsYShbNvTe6tBa4NkbG1B86XmimxvL-qlXD76caI-doRRT4uot1AbruvK7tx1NVJ4pDin3fNzk6ZXayXQwUhdBDPWHbb8Krz_NdZloEbwE5XZHXOkb7a7tCqeDT2LhD5kBTwp_TFWOd1eduiY3lw-MPGrVKVT2aHY6anx4JE1C4Wp1xSEpLzEIXu-aR9YXTshPaVPbs9NzBhqqVr_gCk2erPl0nLaKaWuA3qhEGW-x9SdjRSqhrADQtz-_iMC2eieu7HAWV7g7OPgYwDyCherk-kNyQHPkwbYgAL4vISHHSjolll3NJxpLnWcgnX6AI7-4zZno9a55rlWU9GxFBt4v4YPTfrAOg4u0N1t7zuY5AW4N5pcLxNTA5ggG2WN1G9yKJ3AXN04OlQSQjqD4q9cl24lRLFtpA-f31_u9PKP98SYXGCCY6wVxnCkkKJfoC-LyKMU5FjmumBBGaJLrPlBZSmMJqUvXlniNha_h7JPkuea6nMSheCi7tuVwUqSqKabhazYjpMnzxHbccdQ33YG5692ouN0t5QJ0mCwtn-6-YHMvz5RKLhtasnGdu-JClSu4MM9hpZ6kgsBrvDS7r";
    this.foD.setSecToken(this.token);
    this.getAllApps();
  }

  isOk(obj: Object) { // In typeScript, obj != null, old school JavaScript  
    return (typeof obj !== 'undefined' && obj != null);
  }

  setFoDSvcToken() {
    if (this.isOk(this.token)) {
      this.foD.setSecToken(this.token);
      this.getAllApps();
    }
  }

  setCredentialsFoD() {
    /* 	if( this.isOk(this.teenatName) &&  this.teenatName!= "" &&
        this.isOk(this.userName) &&  this.userName!= "" &&
        this.isOk(this.userPasswd) &&  this.userPasswd!= "" )
      {
        alert("listo para obtener token");		
      } */
  }


  clearFoDError() {
    this.fodErrorStr = "";
    this.showFoDError = false;
  }

  logFoDError(result) {

    if (this.isOk(result.errorCode)) {
      this.fodErrorStr = "uFocus FoD ERROR Code=" + result.errorCode + " : "
        + result.message + " HTTP CODE=" + result.responseCode;
      console.log(this.fodErrorStr);
    } else if (this.isOk(result.errors)) {
      this.fodErrorStr = "uFocus FoD ERROR Code=" + result.errors[0].errorCode + " : "
        + result.errors[0].message;
      console.log(this.fodErrorStr);
    } else if (this.isOk(result.status) && result.status == 404 ) {
      this.fodErrorStr = "HTTP ERROR Code=" + result.status + " msg: " + result.message;
    } else {
      this.fodErrorStr = "Default FoD Error Message. If seen check FoDController.logFoDError() function"
      console.log('FoD Error = ', result );
    }
    this.showFoDError = true;
  }

  getAllApps( initInfo : boolean = false ) {

    if (this.loadingData > 0) {
      //console.log("FoDController.getAllApps: Pending request: wait until completed");
      alert("FoDController.getAllApps: Pending request: wait until completed");
      return;
    }
    if (initInfo) {
      this.appOffset = 0;

      this.clearFoDError();

      this.userAppLoadedCount = 0;
      this.userAppList = [];
      this.userAppCount = 0;

      this.appRelList = [];
      this.appRelCount = 0;

      this.relVulList = [];
      this.relVulListCount = 0;


      this.vulPanelVisible = false;
      this.relPanelVisible = false;
      this.appPanelVisible = false;
    }


    //Prepare url for first or next block
    var req = {
      method: 'GET',
      url: "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit
    };
  

    this.loadingData = this.loadingData + 1;

    this.foD.getObject(req).subscribe(
      data => {
        this.loadingData = this.loadingData - 1;
        this.showFoDError = false;
        console.log("FoDController.getAllApps: paquete apps recibidas");
        this.userAppList = data.items;
        this.userAppLoadedCount = data.items.length;
        this.userAppCount = data.totalCount;
        this.appPanelVisible = true;

      },
      error => {
        this.loadingData = this.loadingData - 1;
        this.logFoDError(error);
      },
      () => {
        //Check if there are more apps not loaded
        if (this.userAppCount > this.userAppLoadedCount) {
          console.log(" FoDController.getAllApps: Cargar siguiente paquete: " + this.userAppCount + "  " + this.userAppLoadedCount);
          this.appOffset = this.appOffset + this.appLimit;
          
          //this.getAllAppsNextBlock();
          var req = {
            method: 'GET',
            url: "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit
          };
        }
      }
    );


  }

/*  getAllAppsNextBlock() {
    var req = {
      method: 'GET',
      url: "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit
    };
    this.loadingData = this.loadingData + 1;
    this.foD.getObject(req).then(
      function (data) {
        this.loadingData = this.loadingData - 1;
        this.showFoDError = false;
        console.log("FoDController.getAllAppsNextBlock: paquete de apps recibidas");
        for (var item in data.items) {
          this.userAppList.push(data.items[item]);
        }
        this.userAppLoadedCount += data.items.length;
        this.userAppCount = data.totalCount;
        this.appPanelVisible = true;
        //Check if there are more apps not loaded
        if (this.userAppCount > this.userAppLoadedCount && (data.items.length > 0)) {
          console.log(" FoDController.getAllAppsNextBlock:  Hay mas!!!!" + this.userAppCount + "  " + this.userAppLoadedCount);
          this.appOffset = this.appOffset + this.appLimit;
          this.getAllAppsNextBlock();
        }
      },
      function (result) {
        this.loadingData = this.loadingData - 1;
        this.logFoDError(result);
      }
    );
  }*/

  /*
  getAppReleasses(appId) {
    if (this.loadingData > 0) {
      //console.log("FoDController.getAllApps: Pending request: wait until completed");
      alert("FoDController.getAppReleasses: Pending request: wait until completed");
      return;
    }

    this.clearFoDError();

    this.relVulList = [];
    this.relVulListCount = 0;
    this.vulPanelVisible = false;

    this.appRelList = [];
    this.appRelCount = 0;
    this.relPanelVisible = false;

    var req = {
      method: 'GET',
      //url:  "/applications"
      url: "/applications/" + appId + "/releases?orderBy=releaseCreatedDate&orderByDirection=DESC"
    };

    this.foD.getObject(req).then(
      function (data) {
        this.showFoDError = false;
        console.log("FoDController.getAppReleasses: paquete de releases recibidas");
        this.appRelList = data.items;
        this.appRelCount = data.totalCount;
        this.relPanelVisible = true;
      },
      function (result) {
        this.logFoDError(result);
      }
    );

  }*/

  /*
  getReleasseVulnerabilities(relId) {

    if (this.loadingData > 0) {
      //console.log("FoDController.getReleasseVulnerabilities: Pending request: wait until completed");
      alert("FoDController.getReleasseVulnerabilities: Pending request: wait until completed");
      return;
    }

    this.clearFoDError();

    this.relVulList = [];
    this.relVulListCount = 0;
    this.vulPanelVisible = false;

    var req = {
      method: 'GET',
      url: "/releases/" + relId + "/vulnerabilities?orderBy=severity&orderByDirection=DESC&offset=0&limit=" + this.vulLimit

    };
    this.loadingData = this.loadingData + 1;
    this.foD.getObject(req).then(
      function (data) {
        this.loadingData = this.loadingData - 1;
        this.showFoDError = false;
        console.log("FoDController.getReleasseVulnerabilities: avul recibidas");
        this.relVulList = data.items;
        this.relVulListCount = data.totalCount;
        this.relVulLoadedCount = data.items.length;
        this.vulPanelVisible = true;
        //Check if there are more apps not loaded
        if (this.relVulListCount > this.relVulLoadedCount && data.items.length > 0) {
          console.log(" Hay mas!!!!" + this.relVulListCount + "  " + this.relVulLoadedCount);
          this.vulOffset = this.vulOffset + this.vulLimit;
          this.getReleasseVulnerabilitiesNextBlock(relId);
        }

      },
      function (result) {
        this.loadingData = this.loadingData - 1;
        this.logFoDError(result);
      }
    );

  }*/
/*
  getReleasseVulnerabilitiesNextBlock(relId) {

    var req = {
      method: 'GET',
      url: "/releases/" + relId + "/vulnerabilities?orderBy=severity&orderByDirection=DESC&offset=" + this.vulOffset + "&limit=" + this.vulLimit
    };
    this.loadingData = this.loadingData + 1;
    this.foD.getObject(req).then(
      function (data) {
        this.loadingData = this.loadingData - 1;
        this.showFoDError = false;
        console.log("FoDController.getReleasseVulnerabilitiesNextBlock: paquete de vulnerabilidades recibidas");
        for (var item in data.items) {
          this.relVulList.push(data.items[item]);
        }
        this.relVulLoadedCount += data.items.length;
        this.relVulListCount = data.totalCount;
        this.vulPanelVisible = true;
        //Check if there are more apps not loaded
        if (this.relVulListCount > this.relVulLoadedCount) {
          console.log("FoDController.getReleasseVulnerabilitiesNextBlock:  2  Hay mas vul !!!!" + this.relVulListCount + "  " + this.relVulLoadedCount);
          this.vulOffset = this.vulOffset + this.vulLimit;
          this.getReleasseVulnerabilitiesNextBlock(relId);
        }
      },
      function (result) {
        this.loadingData = this.loadingData - 1;
        this.logFoDError(result);
      }
    );

  }
*/
  setAppSelected(appName) {
    this.selectedAppName = appName;
    // // this.getAppReleasses(this.selectedAppName);
  }

  setRelSelected(relId, rowIndex) {
    //alert("setRelSelected"+relId );
    this.selectedRelId = relId;
    // // this.getReleasseVulnerabilities(relId);
    this.selectedRow = rowIndex;
  }

  sortKey: string;   //set the sortKey to the param passed
  reverse: boolean;

  sort(keyname) {
    this.sortKey = keyname;   //set the sortKey to the param passed
    this.reverse = !this.reverse; //if true make it false and vice versa
  };


}
