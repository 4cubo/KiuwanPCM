import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FoDService, FoDAppAPIResponse, FoDVulnerability, FoDReleasse, FodProxyRequest, FoDVulAPIResponse } from '../_services/fortify.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
	selector: 'fod-app-rel-vul-details',
	templateUrl: './fod-app-rel-vul-details.component.html',
	styleUrls: ['./fod-app-rel-vul-details.component.css'],

})
export class FoDAppRelVulDetailsComponent implements OnInit, AfterViewInit {

	@Input() applicationId: string;
	@Input() releaseId: string;
	@Input() vulId: string;


	//curRelease : FoDReleasse;

	loadingData = 0; //Number of http client open request

	vulnerability: FoDVulnerability[] = [];
	//vulCount = 0;
	//appOffset = 0;
	//vulLimit = 50;
	//vulLoadedCount = 0;

	vulPanVisible = false;
	//search = "";

	fodErrorStr = "";
	showFoDError = false;

	token: string;

	//selectedAppName: string;
	//selectedRow: number;

	

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
		this.token = localStorage.getItem('FoDToken');
		if (this.token) {
			localStorage.removeItem('FoDToken')
		}else{
			console.log("Error: fod-app-rel-list  constructor: FoDToken doesn´t exits in localstorage"); 
		}
		
		
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
			this.getvulnerability(this.vulId); // void req & init  control data
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

	getvulnerability(vullId: string) {
		let req: any = null;

		if (this.loadingData > 0) {
			alert("FoDController.getAllAppRelVi: Pending request: wait until completed");
			return;
		}
		
		this.initLoadingInfo();
		

		//Prepare req.url
		if  ( req == null ){
			req = new FodProxyRequest();
			req.method= 'GET';
			req.url= "/releases/" + vullId + "/vulnerabilities";
			req.fodcol = 'fod_vuls_comp';
		}

		this.loadingData = this.loadingData + 1;

		this.foD.getObject(req).subscribe(
			data => {
				data as FoDVulAPIResponse;
				this.showFoDError = false;
				this.vulnerability.push(data.items[0]);
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
