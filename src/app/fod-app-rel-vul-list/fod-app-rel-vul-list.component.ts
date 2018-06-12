import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FoDService, FoDAppAPIResponse, FoDVulnerability, FoDReleasse, FodProxyRequest } from '../_services/fortify.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
	selector: 'fod-app-rel-vul-list',
	templateUrl: './fod-app-rel-vul-list.component.html',
	styleUrls: ['./fod-app-rel-vul-list.component.css'],

})
export class FoDAppRelVulListComponent implements OnInit, AfterViewInit {

	@Input() applicationId: string;
	@Input() releaseId: string;

	curRelease : FoDReleasse;

	loadingData = 0; //Number of http client open request

	vulList: FoDVulnerability[] = [];
	vulCount = 0;
	appOffset = 0;
	vulLimit = 50;
	vulLoadedCount = 0;

	vulPanVisible = false;
	search = "";

	fodErrorStr = "";
	showFoDError = false;

	token: string;

	selectedAppName: string;
	selectedRow: number;

	dataSource = new MatTableDataSource<FoDVulnerability>(this.vulList);
	displayedColumns = [
		'id',
		'vulnId',
		'releaseId',
		'fisma',
		'severityString',
		'severity',
		'category',
		'kingdom',
		'owasp2004',
		'owasp2007',
		'owasp2010',
		'owasp2013',
		'owasp2017',
		'cwe',
		'package',
	];

	loadingDataHidden = false; //Initial state

	constructor(
		private foD: FoDService,
		private router: Router,
		private actRoute: ActivatedRoute
	) {

		this.actRoute.params.subscribe(
			params => {
				this.applicationId = params['applicationId'];
				this.releaseId = params['releaseId'];
				// this.token = params['iToken'];
			}
		);
		this.token = localStorage.getItem('FoDToken');
		if (this.token) {
			localStorage.removeItem('FoDToken')
		}else{
			console.log("Error: fod-app-rel-list  constructor: FoDToken doesn´t exits in localstorage");
		}
		
		let strAux: string = localStorage.getItem('CurrentRel');
		if (strAux) {
			this.curRelease = JSON.parse(strAux) as FoDReleasse;
			this.applicationId = this.curRelease.applicationId;
			localStorage.removeItem('CurrentRel');
		}else{
			console.log("Error: fod-app-rel-list  constructor: CurrentRel doesn´t exits in localstorage");
		}

	}

	goBack(): void {
		window.scroll(0, 0);
		this.router.navigate(['/fod/' + this.applicationId], { relativeTo: this.actRoute } );
	}


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	/** Row selection setup */
	selection = new SelectionModel<FoDVulnerability>(true, []);

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	onRowClicked(row) {
		console.log('fod-app-rel-vul-list.onRowClicked  clicked: ', row);
		// this.router.navigate(['/detail/' + row.id]);
		//this.router.navigate(['/fod/rel/' + row.name], { relativeTo: this.actRoute });
		localStorage.setItem('FoDToken', this.token ); 
		//localStorage.setItem('CurrentVul', JSON.stringify(row as FoDReleasse) ); 
		this.router.navigate( ['/fod/' + this.applicationId + '/' + this.releaseId + '/' + row.vulnId] , { relativeTo: this.actRoute } );
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	ngOnInit() {
		console.log("fod-app-rel-list  ngOnInit: ", this.applicationId );
		this.setFoDSvcToken();
	
	}

	isOk(obj: Object) { // In typeScript, obj != null, old school JavaScript  
		return (typeof obj !== 'undefined' && obj != null);
	}

	setFoDSvcToken() {
		if (this.isOk(this.token)) {
			this.foD.setSecToken(this.token);
			this.getVulnerabilities(this.releaseId, null, true); // void req & init  control data
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

	initAppLoadingInfo() {
		this.appOffset = 0;
		this.clearFoDError();
		this.vulLoadedCount = 0;
		this.vulList = [];
		//this.dataSource.data = [];
		this.vulCount = 0;
		this.vulPanVisible = false;
	}

	getVulnerabilities(relId: string, req: any = null, initInfo: boolean = false) {
		if (this.loadingData > 0) {
			//console.log("FoDController.getAllApps: Pending request: wait until completed");
			alert("FoDController.getAllAppRelVi: Pending request: wait until completed");
			return;
		}
		if (initInfo) {
			this.initAppLoadingInfo();
		}

		//Prepare req.url for first or next block
		if  ( req == null ){
			req = new FodProxyRequest();
			req.method= 'GET';
			req.url= "/releases/" + relId + "/vulnerabilities?orderBy=severity&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.vulLimit;
			req.fodcol = 'fod_vuls';
		}

		this.loadingData = this.loadingData + 1;

		this.foD.getObject(req).subscribe(
			data => {
				data as FoDAppAPIResponse;
				this.showFoDError = false;
				for (var item in data.items) {
					this.vulList.push(data.items[item]);
				}
				this.dataSource.data = this.vulList;
				this.vulLoadedCount += data.items.length;
				this.vulCount = data.totalCount;
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
				//Check if there are more apps not loaded
				if (this.vulCount > this.vulLoadedCount) {
					console.log(" FoDController.getVulnerabilities: Cargar siguiente paquete: " + this.vulCount + "  " + this.vulLoadedCount);
					this.appOffset = this.appOffset + this.vulLimit;
					req.url = "/releases/" + relId + "/vulnerabilities?orderBy=severity&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.vulLimit;
					console.log('--------->', req);
					//this.getAllAppRel( this.applicationId, nexReq, false );
				}
			}
		);


	}

	ngAfterViewInit() {
		this.paginator._intl.itemsPerPageLabel = "Request per page";
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

	}




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


	/*setAppSelected(appName) {
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
	*/

}
