import {Component, OnInit, Input} from '@angular/core';
import {KiuwanApplication} from '../classes/kiuwanapplication';
import {KiuwanApplicationService} from '../_services/kiuwan.application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Message} from 'primeng/api';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './kiuwan-application-detail.component.html',
  styleUrls: ['./kiuwan-application-detail.component.css']
})

export class KiuwanApplicationDetailComponent implements OnInit {

  @Input() appName: string;
  KiuwanApplication
  app: KiuwanApplication;

  msgs: Message[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appProvService: KiuwanApplicationService,
    private location: Location,
    private messageService: MessageService,
    //private msgs: Message[]
  ) {
    
    this.route.params.subscribe( params => {
        this.appName = params['name'];
        //this.getApplicationDetail();
      });
  }

  getApplicationDetail(): void {
    this.appProvService.getApplicationAndReports(this.appName)
      .subscribe(
        data => { 
          this.app = data; 
        },
        error => {
          this.msgs = [{severity: 'error', summary: 'BE error loading details of ' + this.appName, 
            detail: error.toString() }];
        },
        ()=>{
          //console.log("  App details=", this.app); 
          console.log('----------ADADADADADD---------------------------> : getApplicationDetail DATA FINISHED LOADING');
          for (let iAux = 0; iAux < this.app.ANALISYS.length; iAux++){
            this.app.ANALISYS[iAux]._secRating = 5;


            if( this.app.ANALISYS[iAux]['com.optimyth.CQM.securityDefectsByPriority.Priority 4'] > 0) 
              this.app.ANALISYS[iAux]._secRating = 4;
            if( this.app.ANALISYS[iAux]['com.optimyth.CQM.securityDefectsByPriority.Priority 3'] > 0) 
              this.app.ANALISYS[iAux]._secRating = 3;
            if( this.app.ANALISYS[iAux]['com.optimyth.CQM.securityDefectsByPriority.Priority 2'] > 0) 
              this.app.ANALISYS[iAux]._secRating = 2;
            if( this.app.ANALISYS[iAux]['com.optimyth.CQM.securityDefectsByPriority.Priority 1'] > 0) 
              this.app.ANALISYS[iAux]._secRating = 1;
          }
          for (let iAux = 0; iAux < this.app.DELIVERIES.length; iAux++){
            this.app.DELIVERIES[iAux]._secRating = 5;
            if( this.app.DELIVERIES[iAux]['com.optimyth.CQM.securityDefectsByPriority.Priority 4'] > 0) 
              this.app.DELIVERIES[iAux]._secRating = 4;
            if( this.app.DELIVERIES[iAux]['com.optimyth.CQM.securityDefectsByPriority.Priority 3'] > 0) 
              this.app.DELIVERIES[iAux]._secRating = 3;
            if( this.app.DELIVERIES[iAux]['com.optimyth.CQM.securityDefectsByPriority.Priority 2'] > 0) 
              this.app.DELIVERIES[iAux]._secRating = 2;
            if( this.app.DELIVERIES[iAux]['com.optimyth.CQM.securityDefectsByPriority.Priority 1'] > 0) 
              this.app.DELIVERIES[iAux]._secRating = 1;
          }
          /*
          1 VH  >   1s
          1 H   >   2s
          1 M   >   3s
          1 L   >   4s
          0 *   >   5z 
          */
          this.messageService.add('ApplicationDetailComponent:getApplicationDeatil name:' + JSON.stringify( this.appName ));
          this.msgs = [{severity: 'info', summary: this.app.name , 
            detail: "BL Analysis: " +  this.app.DELIVERIES.length + " DEL Analysis: " + this.app.DELIVERIES.length }];
        }
      );
    
  }

  goBack(): void {
    //this.location.back();
    //this.router.navigate(['/kiuwan'], { relativeTo: this.route } );
    window.scroll(0,0);
    this.router.navigate(['/kiuwan'] );
    
  }

  ngOnInit() {
    this.getApplicationDetail();
    //this.getApplicationDetail();
  }


}
