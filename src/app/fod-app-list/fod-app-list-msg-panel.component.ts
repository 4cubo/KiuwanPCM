import { Component, OnInit } from '@angular/core';
import { FodAppListMsgService } from './fod-app-list-msg.service';

@Component({
  selector: 'app-fod-app-list-msg-panel',
  templateUrl: './fod-app-list-msg-panel.component.html',
  styleUrls: ['./fod-app-list-msg-panel.component.css']
})
export class FodAppListMsgPanelComponent implements OnInit {

  /*
  showFoDError : boolean = true;
  token: string = "TOKEN";
  fodErrorStr: string = "FOR ERROR";
  userAppLoadedCount: number = 10;
  userAppCount: number = 10;
  */
  constructor( public fodMsgPanelSrv: FodAppListMsgService) { }

  ngOnInit() {
  }

}

