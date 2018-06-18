import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FoDService, FoDAppAPIResponse, FoDVulnerability, FoDReleasse, FodProxyRequest, FoDVulAPIResponse, FoDVulAllDataAPIResponse, FoDVulnerabilityAllData } from '../_services/fortify.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
	selector: 'fod-app-rel-vul-details',
	templateUrl: './fod-app-rel-vul-details.component.html',
	styleUrls: ['./fod-app-rel-vul-details.component.css'],

})
export class FoDAppRelVulDetailsComponent implements OnInit, AfterViewInit {

	//@Input() applicationId: string;
	//@Input() releaseId: string;
	@Input() vulId: string;

	//applicationId: string;
	releaseId: string; //By localStorage

	//curRelease : FoDReleasse;

	loadingData = 0; //Number of http client open request

	vulnerability: FoDVulnerabilityAllData;

	vulPanVisible = false;
	//search = "";

	fodErrorStr = "";
	showFoDError = false;

	token: string;


	loadingDataHidden = false; //Initial state

	constructor(
		private foD: FoDService,
		private router: Router,
		private actRoute: ActivatedRoute
	) {

		this.actRoute.params.subscribe(
			params => {
				//this.applicationId = params['applicationId'];
				//this.releaseId = params['releaseId'];
				this.vulId = params['vulId'];
				// this.token = params['iToken'];
			}
		);
		//localStorage.setItem('FoDToken', this.token ); 
		//localStorage.setItem('releaseId', this.releaseId ); 

		this.token = localStorage.getItem('FoDToken');
		if (this.token) {
			localStorage.removeItem('FoDToken')
		}else{
			console.log("Error: fod-app-rel-vul-details  constructor: FoDToken doesn´t exits in localstorage"); 
		}

		/*this.applicationId = localStorage.getItem('applicationId');
		if (this.applicationId) {
			localStorage.removeItem('applicationId')
		}else{
			console.log("Error: fod-app-rel-vul-details  constructor: applicationId doesn´t exits in localstorage"); 
		}*/

		this.releaseId = localStorage.getItem('releaseId');
		if (this.releaseId) {
			localStorage.removeItem('releaseId')
		}else{
			console.log("Error: fod-app-rel-vul-details  constructor: releaseId doesn´t exits in localstorage"); 
		}
		
		console.log ("Panel de detalle de vulnerabilidad: releaseId=",this.releaseId, " this.vulId=", this.vulId  );
	}

	goBack(): void {
		window.scroll(0, 0);
		//this.location.back();
		//this.router.navigate(['/fod/' + this.applicationId], { relativeTo: this.actRoute } );
	}


	

	

	ngOnInit() {
		this.setFoDSvcToken(); // Token has been intialized in constructor
		console.log('--------->');
	}

	isOk(obj: Object) {
		return (typeof obj !== 'undefined' && obj != null);
	}

	setFoDSvcToken() {
		if (this.isOk(this.token)) {
			this.foD.setSecToken(this.token);
			this.getvulnerability(); // void req & init  control data
		}
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
		} else if (this.isOk(result.status) && result.status == 404) {
			this.fodErrorStr = "HTTP ERROR Code=" + result.status + " msg: " + result.message;
		} else {
			this.fodErrorStr = "Default FoD Error Message. If seen check FoDController.logFoDError() function"
			console.log('FoD Error = ', result);
		}
		this.showFoDError = true;
	}

	initLoadingInfo() {
		this.clearFoDError();
		this.vulnerability = null;
		this.vulPanVisible = false;
	}

	getvulnerability() {
		let req: any = null;

		if (this.loadingData > 0) {
			alert("getvulnerability: Pending request: wait until completed");
			return;
		}
		
		this.initLoadingInfo();
		

		//Prepare req.url GET /api/v3/releases/{releaseId}/vulnerabilities/{vulnId}/all-data
		if  ( req == null ){
			req = new FodProxyRequest();
			req.method= 'GET';
			req.url= "/releases/" + this.releaseId + "/vulnerabilities/"+this.vulId+"/all-data";
			req.fodcol = 'fod_vuls_comp';
		}

		this.loadingData = this.loadingData + 1;

		this.foD.getObject(req).subscribe(
			data => {
				var foDVulAllDataAPIResponse= data as FoDVulnerabilityAllData;
				this.showFoDError = false;
				this.vulnerability=foDVulAllDataAPIResponse;
				this.vulPanVisible = true;
			},
			error => {
				this.loadingData = this.loadingData - 1;
				this.logFoDError(error);
				this.loadingDataHidden = true; // hide loading
			},
			() => {
				this.loadingData = this.loadingData - 1;
				this.loadingDataHidden = true; // hide loading
			}
		);
	}

	ngAfterViewInit() {
	}
}
