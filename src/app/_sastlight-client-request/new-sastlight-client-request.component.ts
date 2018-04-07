import {User} from '../_user/user';
import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/api';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-new-sastlight-client-request',
  templateUrl: './new-sastlight-client-request.component.html',
  styleUrls: ['./new-sastlight-client-request.component.css']
})
export class NewSastlightClientRequestComponent implements OnInit {

  msgs: Message[];
  currentUser: User;
  token: string;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("NewSastlightClientRequestComponent.constructor user.token=:" + this.currentUser.token ); //@aaa delete 
    this.token = this.currentUser.token;
  }

  uploadURL: "http://localhost:4000/uploadFile/getData"; /* @aaa  no tira al meter {{uploadURL}} en el elemento*/

  uploadedFiles: any[] = [];


  onUpload(event) {
    console.log ("-------------->onUpload: event="+JSON.stringify(event.xhr.response));

    const fileConf = JSON.parse(event.xhr.response).fileConf;
    for (let file of event.files) {
      file.fileConf = fileConf;
      this.uploadedFiles.push(file);
    }
    //this.msgs = [];                               // @aaa TODO eliminar este servicio de mensajes y su vista
    //this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onBeforeSend(event) {
    console.log ("-------------->onBeforeSend: event="+JSON.stringify(event));
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
  }
  
  uploadHandler(event) {
    console.log ("-------------->uploadHandler: event="+JSON.stringify(event));
  }
  
  onSuccess(event){
    console.log ("-------------->onSuccess: event="+JSON.stringify(event));
  }

  ngOnInit() {
  }

}



