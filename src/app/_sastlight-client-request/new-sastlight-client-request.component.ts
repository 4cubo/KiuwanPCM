import {User} from '../_user/user';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Message} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {TreeNode} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-new-sastlight-client-request',
  templateUrl: './new-sastlight-client-request.component.html',
  styleUrls: ['./new-sastlight-client-request.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewSastlightClientRequestComponent implements OnInit {

  msgs: Message[];
  currentUser: User;
  token: string;
  data1: TreeNode[];

  constructor(private confirmationService: ConfirmationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("NewSastlightClientRequestComponent.constructor user.token=:" + this.currentUser.token); //@aaa delete 
    this.token = this.currentUser.token;
  }

  private uploadURL: "http://localhost:4000/uploadFile/getData"; /* @aaa  no tira al meter {{uploadURL}} en el elemento*/

  uploadedFile: any = null;


  onUpload(event) {
    console.log("-------------->onUpload: event.xhr.response=" + JSON.stringify(event.xhr.response));
    const response = JSON.parse(event.xhr.response);
    this.msgs = [{severity: 'info', summary: 'Uploaded', detail: 'FILE UPLOADED'}];
    for (let file of event.files) {
      file.fileConf = response.fileConf;
      file.parsedStr = JSON.stringify(response.parsed);
      file.parsed = response.parsed;
      this.uploadedFile = file;
    }
  }

  onBeforeSend(event) {
    console.log("-------------->onBeforeSend: event=" + JSON.stringify(event));
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
  }


  confirmCreate() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to create infra for application?',
      header: 'Confirm creation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'CREATE'}];
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }
  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete temporal files uploaded to the  server?',
      header: 'Confirm Delete',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'CREATE'}];
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }



  onNodeSelect(event) {
    // this.messages = [{severity: 'success', summary: 'Node Selected', detail: event.node.label}];
    console.log("Selected detail:" + event.node.label);
  }

  updateGraphData (){
    let rootNodeF: TreeNode =  {
        label : this.uploadedFile.file,
        data: { name: this.uploadedFile.fileConf.curName, 'avatar': 'walter.jpg'},
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        children: []
    };

    let rootNodeA: TreeNode =  {
        label : this.uploadedFile.parsed.P_CLI + '  ' + this.uploadedFile.parsed.P_APP,
        data: {name: this.uploadedFile.parsed.P_PRO, 'avatar': 'walter.jpg'},
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        children: []
    };
    
    let subAppsNodes: TreeNode[] = new Array (this.uploadedFile.parsed.__subAppNameList.length);
    for (let i = 0; i < this.uploadedFile.parsed.__subAppNameList.length; i++){  
      subAppsNodes[i] = <TreeNode> {
        label : this.uploadedFile.parsed.__subAppNameList[i],
        data: { name: this.uploadedFile.parsed.P_PRO, 'avatar': 'walter.jpg'},
        type: 'person',
        styleClass: 'ui-person',
        expanded: true,
        children: []
      };
      rootNodeA.children = subAppsNodes;
    }

    rootNodeF.children.push (rootNodeA);
    this.data1 = [rootNodeF];
  }

  ngOnInit() {

    this.data1 = [{
      label: '18Q200001',
      type: 'person',
      styleClass: 'ui-person',
      expanded: true,
      data: {name: 'Walter White', 'avatar': 'walter.jpg'},
      children: [
        {
          label: 'CFO',
          type: 'person',
          styleClass: 'ui-person',
          expanded: true,
          data: {name: 'Saul Goodman', 'avatar': 'saul.jpg'},
          children: [{
            label: 'Tax',
            styleClass: 'department-cfo'
          },
          {
            label: 'Legal',
            styleClass: 'department-cfo'
          }],
        },
        {
          label: 'COO',
          type: 'person',
          styleClass: 'ui-person',
          expanded: true,
          data: {name: 'Mike E.', 'avatar': 'mike.jpg'},
          children: [{
            label: 'Operations',
            styleClass: 'department-coo'
          }]
        },
        {
          label: 'CTO',
          type: 'person',
          styleClass: 'ui-person',
          expanded: true,
          data: {name: 'Jesse Pinkman', 'avatar': 'jesse.jpg'},
          children: [{
            label: 'Development',
            styleClass: 'department-cto',
            expanded: true,
            children: [{
              label: 'Analysis',
              styleClass: 'department-cto'
            },
            {
              label: 'Front End',
              styleClass: 'department-cto'
            },
            {
              label: 'Back End',
              styleClass: 'department-cto'
            }]
          },
          {
            label: 'QA',
            styleClass: 'department-cto'
          },
          {
            label: 'R&D',
            styleClass: 'department-cto'
          }]
        }
      ]
    }];
  }

}



