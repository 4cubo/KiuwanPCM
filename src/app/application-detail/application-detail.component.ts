import {Component, OnInit, Input} from '@angular/core';
import {Application} from '../classes/application';
import {ApplicationProviderService} from '../_services/applicationprovider.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css']
})

export class ApplicationDetailComponent implements OnInit {

  @Input() app: Application;

  constructor(
    private route: ActivatedRoute,
    private appProvService: ApplicationProviderService,
    private location: Location,
    private messageService: MessageService
  ) {
    console.log("Constructor de ApplicationDetailComponent"); //@aaa delete

  }

  getApplication(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messageService.add('ApplicationDetailComponent:getApplication id:' + id);
    this.appProvService.getApplication(id)
      .subscribe(app => this.app = app);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getApplication();
  }


}
