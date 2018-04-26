import {Component, OnInit, Input} from '@angular/core';
import {Kiuwanapplication} from '../classes/kiuwanapplication';
import {KiuwanApplicationService} from '../_services/kiuwan.application.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './kiuwan-application-detail.component.html',
  styleUrls: ['./kiuwan-application-detail.component.css']
})

export class KiuwanApplicationDetailComponent implements OnInit {

  @Input() app: Kiuwanapplication;

  constructor(
    private route: ActivatedRoute,
    private appProvService: KiuwanApplicationService,
    private location: Location,
    private messageService: MessageService
  ) {
    console.log("Constructor de ApplicationDetailComponent"); //@aaa delete

  }

  getApplicationDetail(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.messageService.add('ApplicationDetailComponent:getApplicationDeatil name:' + name );
    this.appProvService.getApplication( name )
      .subscribe(app => {this.app = app;console.log("    App=" , this.app ); });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getApplicationDetail();
  }


}
