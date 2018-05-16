import {Component, OnInit, Input} from '@angular/core';
import {Kiuwanapplication} from '../classes/kiuwanapplication';
import {KiuwanApplicationService} from '../_services/kiuwan.application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './kiuwan-application-detail.component.html',
  styleUrls: ['./kiuwan-application-detail.component.css']
})

export class KiuwanApplicationDetailComponent implements OnInit {

  @Input() name: string;
  
  app: Kiuwanapplication;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appProvService: KiuwanApplicationService,
    private location: Location,
    private messageService: MessageService
  ) {
    
    this.route.params.subscribe( params => {
        this.name = params['name'];
        //this.getApplicationDetail();
      });
  }

  getApplicationDetail(): void {
    
    //const name = this.route.snapshot.paramMap.get('name');

    this.messageService.add('ApplicationDetailComponent:getApplicationDeatil name:' + this.name);
    
    this.appProvService.getApplication(this.name)
      .subscribe(
        app => { 
          this.app = app; console.log("  App details=", this.app); 
        }
      );
    
  }

  goBack(): void {
    //this.location.back();
    //this.router.navigate(['/kiuwan'], { relativeTo: this.route } );
    this.router.navigate(['/kiuwan'] );
    
  }

  ngOnInit() {
    this.getApplicationDetail();
    //this.getApplicationDetail();
  }


}
