import { Component, OnInit, AfterViewInit } from '@angular/core';
import { KiuwanApplicationService } from '../_services/kiuwan.application.service';

@Component({
  selector: 'app-kiuwan-data',
  templateUrl: './kiuwan-data.component.html',
  styleUrls: ['./kiuwan-data.component.css']
})
export class KiuwanDataComponent implements OnInit, AfterViewInit {

  constructor(
    private kiuSrv: KiuwanApplicationService,
    //private messageService: MessageService,
    //private router: Router
  ) {
    console.log("Constructor de KiuwanDataComponent"); //@aaa delete
  }

  userName : string;
  userPasswd : string;

  
  kiuwanDataStatus = { 
    id : '',
    status : '', 
    startload : '',
    endload : ''
  };

  STATISTICS = {};

  ngOnInit() {
    //this.kiuSrv.setCredentials(this.userName, this.userPasswd);
    this.kiuSrv.setCredentials("poc.isban.alvaro.alonso", "q0q=tnJsV1Isn9HUECaR");
    this.getStatus();
  }

  ngAfterViewInit() {
   
  }

  //Get info of the loading proccess
  getStatus(): void {
    this.kiuSrv.getStatus()
      .subscribe(
      status => {
        this.kiuwanDataStatus = status;
        console.log('getStatus->', status );
        //this.getStatusCB(apps as Kiuwanapplication[]);
      },
      error => {
        console.log('getStatus->ERROR', error);
      });
  }
  
  // Start loading kiuwan data in mongoDB
  loadKiuwanData(): void {
    //Status of the loading proccess control
    this.kiuSrv.loadData()
      .subscribe(
        status => {
        
          this.kiuwanDataStatus.status = (status.n == 1 )?  "Loading..." : "Not Loaded" ;
          console.log('loadData->', status );
        },
        error => {
          console.log('loadData->ERROR', error);
        }
    );


    
  }
}
