import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FoDApplication, FoDService, FoDAppAPIResponse } from '../_services/fortify.service';
import { Router, ActivatedRoute } from '@angular/router';


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

	fodErrorStr = "";
	showFoDError = false;


	token: string;


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
		private actRoute: ActivatedRoute
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
		console.log('ClientRequestComponent.onRowClicked  clicked: ', row);
		// this.router.navigate(['/detail/' + row.id]);
		this.router.navigate(['/fod/rel/' + row.applicationId], { relativeTo: this.actRoute } );
	}
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}


	ngOnInit() {
		this.token = "AAEAADVslexFnzpvVhkTAQ2C8S4IiGw0ob61sho12jjqTjxLX84djFjrYgewuM7RKbIxJGNG77vxTyDcg6fhE3qJkYfgX_MB6AbNuox22VBb0wigXtwmc7hzcHrsHw2O1ZyBzwXo1RoD8qXlMDDNGBKPemUuTKQFTPRJwV-DYpl63f3of-4iO3X7FEJwiDX6AYfVYA6rM6UHg_DumPNkzPEgCDTHX0XBrr4wW8fgetyU3La0s5F3bXkbn0YARtb7WDKZHqG2XyvJB9jwT_uJsVePXVBmAmhNYo81opNSfU3fY2l9OSfHH7-H7B6uxymrB8eySnW13c80AWkEdAslvkIAaIVUAwAAAAEAAICoBjY1yqCQXKU7-mgVq-VRWBq9fUd7EgLq9un84zWEp5NINpv1Jsff0vn5eWFUllv9Ul3f3obxTiLv6rYh_mcxznsTzh8nX0H8fQU7OeRnsMT1ZKYO2q68DVQQ2JZMmQBTCU3FCWKdZuFZ0jYJNE_Pfd4A7vshbQNYOc6Jt_d7u0VcPL9HPL7BX1er8OmBg4M0UpqtbOUyetrHzN1Abq5kmLXBnUxwNXevYwVpPv8ECTx-KBxpGZ33v7NHo2UR9bHtIB8lIUNv6DToIjORNEObK5jo-BPTn0DN_eN6opyTuMzTvSudZko0fTZ-ZMkfxX6jNFVPfVK0vWH01T3Sy-Q4HBkKs0Xwj1mpRZMR9ocp336ymIlswIa4lk7ZdToy1V6wYB7Rs9jSJJctGIJuOijnD_aL5oGu2f0Yn_0w73Cyq3QwjbZp7CflL9371JNqqZjn3AyrFoO7xo84AHUcWtJIjGzmWlnxsfp_neF4w3s98FzU7wnjY3C5vp2aXIHnvvmVbEXA7AP6-YmI6SoHtPRFxBru5BNhB0gCuQYbKv1GzVXaB_FDnQJcV4O_ZvqxVggSZGepG8jceGnLGKK1M8VV3vY6PxBKx-D0e7Gwh_4rx5Z_ZetbJHP9YVWhIMNWeJatUusLKj7A7Qx_kQ6huGsologR-T-a5u5VlFZht1VjbmOBxsqMTgZA_7GQsZdSHO5Vq9flfvRKc_5S4TOnnhxhf5IkI9fv6MklX3Ui37FD5c9NIvEwhkgLDyCOkeBXJ5OjWs6IzVPeBsvYTMouz9T1Qqm8HxmLx2ZvxJHWdMxupZAWlXtBFaeNeT44SFIWbJen3axm9m73xhun9WIUEBnR5if5fGYiwojAXfc64I-UVeAyz2cqs9cYYMktFX2LF6i7drOibosJ2tFu1o6kXi5Mb2aus2YZd_F5iRK-2oG8FmPYA4Wy0mi9cfNB9tDZ9MbB4pjb_UjhaKUN13YdAU13M17dLuAGEros1dWtpRGRyVi3wCGWoqaP5tSoNoYb-5lWnJZojmBidZNxfT_hGVRD6GpMBjk4_VlME9OJ9U3xrFQm6F2lm6jOSjnID5OFwkdfZUs6f0a71sjVidtEK--k90vAkG-3uPJR20a6O-Hk";
		this.setFoDSvcToken();
	}

	isOk(obj: Object) { // In typeScript, obj != null, old school JavaScript  
		return (typeof obj !== 'undefined' && obj != null);
	}

	setFoDSvcToken() {
		if (this.isOk(this.token)) {
			this.foD.setSecToken(this.token);
			this.getAllApps( null, true ); // void req & init  control data
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
		this.appOffset = 0;
		this.clearFoDError();
		this.userAppLoadedCount = 0;
		this.userAppList = [];
		//this.dataSource.data = [];
		this.userAppCount = 0;
		this.appPanelVisible = false;
	}

	getAllApps( req : any = null, initInfo: boolean = false) {
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
			
			req = {
				method: 'GET',
				url: "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit
			};
		}
		this.loadingData = this.loadingData + 1;

		this.foD.getObject(req).subscribe(
			data => {
				data as FoDAppAPIResponse;
				this.showFoDError = false;
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
				this.loadingData = this.loadingData - 1;
				this.loadingDataHidden = true; // hide loading
				//Check if there are more apps not loaded
				if (this.userAppCount > this.userAppLoadedCount) {
					console.log(" FoDController.getAllApps: Cargar siguiente paquete: " + this.userAppCount + "  " + this.userAppLoadedCount);
					this.appOffset = this.appOffset + this.appLimit;

					//this.getAllAppsNextBlock();
					var nexReq = {
						method: 'GET',
						url: "/applications?orderBy=applicationCreatedDate&orderByDirection=DESC&offset=" + this.appOffset + "&limit=" + this.appLimit
					};

					console.log ( '--------->', nexReq );
					//this.getAllApps( nexReq, false );
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
