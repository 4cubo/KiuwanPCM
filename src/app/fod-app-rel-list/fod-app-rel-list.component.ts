import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FoDService, FoDReleasse, FoDRelAPIResponse, FoDApplication, FodProxyRequest } from '../_services/fortify.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
	selector: 'fod-app-rel-list',
	templateUrl: './fod-app-rel-list.component.html',
	styleUrls: ['./fod-app-rel-list.component.css'],

})
export class FoDAppRelListComponent implements OnInit, AfterViewInit {

	@Input() applicationId: string;
	curApp  : FoDApplication;
	loadingData = 0; //Number of http client open request

	relList: FoDReleasse[] = [];
	relCount = 0;
	relOffset = 0;
	appLimit = 50;
	relLoadedCount = 0;

	relPanVisible = false;
	search = "";

	fodErrorStr = "";
	showFoDError = false;

	token: string;

	selectedRelName: string;
	selectedRow: number;

	dataSource = new MatTableDataSource<FoDReleasse>(this.relList);
	displayedColumns = [
		'releaseId',
		'releaseName',
		'releaseDescription',
		'releaseCreatedDate',
		'rating',
		'critical',
		'high',
		'medium',
		'low',
		//'currentStaticScanId',
		//'staticAnalysisStatusType',
		//'staticAnalysisStatusTypeId',
		'staticScanDate',
		'issueCount'
		//'isPassed',
		//'passFailReasonType',
		//'sdlcStatusType', */
	];




	loadingDataHidden = false; //Initial state

	//Gets input param applicationId & FodToken and CurrentApp data from locaStorage 
	constructor(
		private foD: FoDService,
		private router: Router,
		private actRoute: ActivatedRoute
	) {
		this.actRoute.params.subscribe(
			params => {
				this.applicationId = params['applicationId'];
				//this.token = params['iToken'];
			}
		);

		this.token = localStorage.getItem('FoDToken');
		if (this.token) {
			localStorage.removeItem('FoDToken')
		}else{
			console.log("Error: fod-app-rel-list  constructor: FoDToken doesn´t exits in localstorage");
		}
		
		let strAux: string = localStorage.getItem('CurrentApp');
		if (strAux) {
			this.curApp = JSON.parse(strAux) as FoDApplication;
			localStorage.removeItem('CurrentApp');
		}else{
			console.log("Error: fod-app-rel-list  constructor: CurrentApp doesn´t exits in localstorage");
		}

		
	}

	goBack(): void {
		window.scroll(0, 0);
		this.router.navigate(['/fod']);
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	/** Row selection setup */
	selection = new SelectionModel<FoDReleasse>(true, []);

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
		console.log('fod-app-rel-list.onRowClicked  clicked: ', row.name, row.id );
		localStorage.setItem('FoDToken', this.token ); 
		localStorage.setItem('CurrentRel', JSON.stringify(row as FoDReleasse) ); 
		this.router.navigate(['/fod/' + row.applicationId + '/' + row.releaseId], { relativeTo: this.actRoute } );
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	ngOnInit() {
		this.setFoDSvcToken();
		console.log('--------->');
		console.log("FoDAppRelListComponent: applicationId= " , this.applicationId );
		console.log("FoDAppRelListComponent: curApp= " , this.curApp );
		console.log("FoDAppRelListComponent: applicationId= " , this.token );
	}

	isOk(obj: Object) { // In typeScript, obj != null, old school JavaScript  
		return (typeof obj !== 'undefined' && obj != null);
	}

	setFoDSvcToken() {
		if (this.isOk(this.token)) {
			this.foD.setSecToken(this.token);
			this.getAllAppRel(this.applicationId, null, true); // void req & init  control data
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
		} else if (this.isOk(result.status) && result.status == 404) {
			this.fodErrorStr = "HTTP ERROR Code=" + result.status + " msg: " + result.message;
		} else {
			this.fodErrorStr = "Default FoD Error Message. If seen check FoDController.logFoDError() function"
			console.log('FoD Error = ', result);
		}
		this.showFoDError = true;
	}

	initAppLoadingInfo() {
		this.relOffset = 0;
		this.clearFoDError();
		this.relLoadedCount = 0;
		this.relList = [];
		//this.dataSource.data = [];
		this.relCount = 0;
		this.relPanVisible = false;
	}

	getAllAppRel(appId: string, req: any = null, initInfo: boolean = false) {
		if (this.loadingData > 0) {
			//console.log("FoDController.getAllApps: Pending request: wait until completed");
			alert("FoDController.getAllApps: Pending request: wait until completed");
			return;
		}
		if (initInfo) {
			this.initAppLoadingInfo();
		}

		//Prepare url for first or next block
		if  ( req == null ){
			req = new FodProxyRequest();
			req.method= 'GET';
			req.url= "/applications/" + appId + "/releases?orderBy=releaseCreatedDate&orderByDirection=DESC&offset=" + this.relOffset + "&limit=" + this.appLimit;
			req.fodcol = 'fod_rels';
		}

		this.loadingData = this.loadingData + 1;

		this.foD.getObject(req).subscribe(
			data => {
				data as FoDRelAPIResponse;
				this.showFoDError = false;
				for (var item in data.items) {
					this.relList.push(data.items[item]);
				}
				this.dataSource.data = this.relList;
				this.relLoadedCount += data.items.length;
				this.relCount = data.totalCount;
				this.relPanVisible = true;
			},
			error => {
				this.loadingData = this.loadingData - 1;
				this.logFoDError(error);
				this.loadingDataHidden = true; // hide loading
			},
			() => {
				/* if(this.relList && this.relList.length && this.relList[0]['applicationName'])
					this.appName = this.relList[0]['applicationName']; */
				this.loadingData = this.loadingData - 1;
				this.loadingDataHidden = true; // hide loading
				//Check if there are more apps not loaded
				if (this.relCount > this.relLoadedCount) {
					console.log(" fod-app-rel-list.getAllAppRel: Cargar siguiente paquete: " + this.relCount + "  " + this.relLoadedCount);
					this.relOffset = this.relOffset + this.appLimit;
					req .url= "/applications/" + appId + "/releases?orderBy=releaseCreatedDate&orderByDirection=DESC&offset=" + this.relOffset + "&limit=" + this.appLimit;
					console.log('--------->', req);
					this.getAllAppRel(appId, req, false);
				}
			}
		);


	}

	ngAfterViewInit() {
		this.paginator._intl.itemsPerPageLabel = "Request per page";
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

	}

}
