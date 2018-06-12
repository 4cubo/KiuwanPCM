import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FoDApplication, FoDService, FoDAppAPIResponse, FodProxyRequest } from '../_services/fortify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FodAppListMsgService } from './fod-app-list-msg.service';


@Component({
	selector: 'fod-app-list',
	templateUrl: './fod-app-list.component.html',
	styleUrls: ['./fod-app-list.component.css']
})
export class FoDAppListComponent implements OnInit, AfterViewInit {

	loadingData = 0; //Number of http client open request

	userAppList: FoDApplication[] = [];
	userAppCount = 0;
	appOffset = 0;
	appLimit = 50;
	userAppLoadedCount = 0;



	appPanelVisible = false;


	search = "";

	//fodErrorStr = "";
	//showFoDError = false;


	//token: string;


	selectedAppName: string;
	selectedRow: number;


	dataSource = new MatTableDataSource<FoDApplication>(this.userAppList);
	displayedColumns = ['applicationId', 'applicationName', 'applicationDescription',
		'applicationCreatedDate', 'businessCriticalityTypeId', 'businessCriticalityType',
		'applicationTypeId', 'applicationType',];

	loadingDataHidden = false; //Initial state

	constructor(
		private foD: FoDService,
		private router: Router,
		private actRoute: ActivatedRoute,
		public fodMsgPanelSrv: FodAppListMsgService,
	) { }

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	/** Row selection setup */
	selection = new SelectionModel<FoDApplication>(true, []);

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
		console.log('fod-app-list.onRowClicked  clicked: ', row);
		//this.router.navigate(['/fod/rel/' + row.applicationId + '/' + this.token], { relativeTo: this.actRoute } );
		localStorage.setItem('FoDToken', this.fodMsgPanelSrv.status.token ); 
		localStorage.setItem('CurrentApp', JSON.stringify(row as FoDApplication) ); 
		//this.router.navigate(['/fod/rel/' + row.applicationId + '/' + this.token], { relativeTo: this.actRoute } );
		this.router.navigate(['/fod/' + row.applicationId ], { relativeTo: this.actRoute } );
	}
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}


	ngOnInit() {
		if (this.isOk(this.fodMsgPanelSrv.status.token)) {
			this.fodMsgPanelSrv.add ("Valid token, initialising Fortify conection ");
			this.setFoDSvcToken();
		}else{
			this.fodMsgPanelSrv.add ("Invalid token, please fill with correct one");
		}
	}

	isOk(obj: Object) { // In typeScript, obj != null, old school JavaScript  
		return (typeof obj !== 'undefined' && obj != null);
	}

	setFoDSvcToken() {
		if (this.isOk(this.fodMsgPanelSrv.status.token)) {
			
			this.foD.setSecToken(this.fodMsgPanelSrv.status.token);
			this.getAllApps( null, true ); // void req & init  control data
		}
	}


	clearFoDError() {
		this.fodMsgPanelSrv.status.errorString = "";
		this.fodMsgPanelSrv.status.error = false;
	}

	logFoDError(result) {
		if (this.isOk(result.errorCode)) {
			this.fodMsgPanelSrv.status.errorString= "uFocus FoD ERROR Code=" + result.errorCode + " : "
				+ result.message + " HTTP CODE=" + result.responseCode;
			console.log(this.fodMsgPanelSrv.status.errorString);
		} else if (this.isOk(result.errors)) {
			this.fodMsgPanelSrv.status.errorString = "uFocus FoD ERROR Code=" + result.errors[0].errorCode + " : "
				+ result.errors[0].message;
			console.log(this.fodMsgPanelSrv.status.errorString);
		} else if (this.isOk(result.status) && (result.status == 404 || result.status == 401 ) ) {
			this.fodMsgPanelSrv.status.errorString = "HTTP ERROR Code=" + result.status + " msg: " + result.message;
		} else if (this.isOk(result.status) && (result.status == 503  ) ) {
			this.fodMsgPanelSrv.status.errorString = " Fortify is unavailable: status code=" + result.status + " Message: " + result.message;
		}else {
			this.fodMsgPanelSrv.status.errorString = "Default FoD Error Message. If seen check FoDController.logFoDError() function"
			console.log('FoD Error = ', result);
		}
		this.fodMsgPanelSrv.status.error = true;
		this.fodMsgPanelSrv.status.loadedCount = 0;
		this.fodMsgPanelSrv.status.totalCount = 0;
	}
	initAppLoadingInfo() {
		this.appOffset = 0;
		this.clearFoDError();
		this.userAppLoadedCount = 0;
		this.userAppList = [];
		//this.dataSource.data = [];
		this.userAppCount = 0;
		this.appPanelVisible = false;
	}

	getAllApps( req : FodProxyRequest = null, initInfo: boolean = false) {
		if (this.loadingData > 0) {
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
			req.url= "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit;
			req.fodcol = 'fod_apps';
		}
		this.loadingData = this.loadingData + 1;

		this.foD.getObject(req).subscribe(
			data => {
				data as FoDAppAPIResponse;
				this.fodMsgPanelSrv.status.error= false;
				for (var item in data.items) {
					this.userAppList.push(data.items[item]);
				}
				this.dataSource.data= this.userAppList;
				this.userAppLoadedCount += data.items.length;
				this.userAppCount = data.totalCount;
				this.appPanelVisible = true;
			},
			error => {
				this.loadingData = this.loadingData - 1;
				this.logFoDError(error);
				this.loadingDataHidden = true; // hide loading
			},
			() => {
				this.fodMsgPanelSrv.status.loadedCount = this.userAppLoadedCount;
				this.fodMsgPanelSrv.status.totalCount = this.userAppCount;

				this.loadingData = this.loadingData - 1;
				this.loadingDataHidden = true; // hide loading
				//Check if there are more apps not loaded
				if (this.userAppCount > this.userAppLoadedCount) {
					this.fodMsgPanelSrv.add ( "Cargar siguiente paquete: " + this.userAppCount + "  " + this.userAppLoadedCount);

					console.log(" FoDController.getAllApps: Cargar siguiente paquete: " + this.userAppCount + "  " + this.userAppLoadedCount);
					this.appOffset = this.appOffset + this.appLimit;

					//this.getAllAppsNextBlock();
					req.url =  "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit;
					console.log ( '--------->', req );
					//this.getAllApps( req, false );
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
