import { ClientRequestProviderService } from '../_services/clientrequestprovider.service';
import {User} from '../_user/user';
import { appConfig } from '../app.config';
import { SASTRequest, SASTRequest_OS } from '../classes/sastrequest';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Message} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {TreeNode} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { stringify } from 'querystring';


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
  uploadURL: string = appConfig.apiUrl + '/uploadFile';  //@aaa @TODO  la utl del p-fileupload no se esta cogiendo de conf

  constructor (
    private confirmationService: ConfirmationService,
    private requestService: ClientRequestProviderService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("NewSastlightClientRequestComponent.constructor user.token=:" + this.currentUser.token); //@aaa delete 
    this.token = this.currentUser.token;
  }

  uploadedFile: SASTRequest;

  onUpload(event) {
    console.log("onUpload: event.xhr.response=" + JSON.stringify(event.xhr.response));
    let response = JSON.parse(event.xhr.response);
    this.msgs = [{severity: 'info', summary: 'Uploaded', detail: 'FILE UPLOADED'}];
//    for (let file of event.files) { // only can be one
//      // response[''] = response;
//      break;
//    }
    this.uploadedFile = response;
    this.updateGraphData ();
  }

  onBeforeSend(event) {
    console.log("-------------->onBeforeSend: event=" + JSON.stringify(event));
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
  }

  /* Send SASTRequest to be saved */
  resultSaveRequest( ) {
   this.requestService.saveRequest( { obj : this.uploadedFile } )
   .subscribe(
      result => {
        if(result && result.result  ){
          console.log("-^^^^^^^^^^^^^^^^>", result );
          this.msgs = [{severity: 'info', summary: 'Request saved with id='+
             result.SASTId + '[' + result.dbId + ']', detail: 'CREATE'}];
        } else {
          this.msgs = [{severity: 'error', summary: 'Error'  }];
        }
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Error', detail: error.error }];
      }
    );
  }

  confirmSaveTempFile() {
    this.confirmationService
    .confirm({
      message: 'Are you sure that you want to save SAST Request data for ' + this.uploadedFile.name + '?',
      header: 'Confirm save ' + this.uploadedFile.curSASTId,
      icon: 'fa fa-question-circle',
      accept: () => this.resultSaveRequest(),
      reject: () => this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}]
    }
    );
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

  // Put on server this logic
  updateGraphData (){
    console.log( "updateGraphData------------->", this.uploadedFile  );
    let excelFileNode: TreeNode =  {
        label : 'SAST REQUEST FILE',
        data: { fileName : this.uploadedFile.name, curName : this.uploadedFile.curSASTId + "   ", 'avatar': 'walter.jpg'},
        type: 'sastrequest',
        styleClass: 'ui-person',
        expanded: true,
        children: []
    };

    let projectNode: TreeNode =  {
        label : 'SAST REQUEST INFO',
        data: { projectZ : this.uploadedFile.P_PRO,
                project : this.uploadedFile.P_DES,
                client : this.uploadedFile.P_CLI,
                app : this.uploadedFile.P_APP,
                provider: this.uploadedFile.P_PROV,
                ba: this.uploadedFile.PM_BA,
                fc: this.uploadedFile.PM_FC,
                pmn: (this.uploadedFile.PM_FN + ' ' + this.uploadedFile.PM_LN)
        },
        type: 'project',
        styleClass: 'ui-person',
        expanded: true,
        children: []
    };

    let subAppsNodes: TreeNode[] = new Array (this.uploadedFile.__subAppNameList.length);
    for (let i = 0; i < this.uploadedFile.__subAppNameList.length; i++){  
      subAppsNodes[i] = <TreeNode> {
        label : this.uploadedFile.__subAppNameList[i],
        data: { name: this.uploadedFile.__subAppNameList2[i]}, //, 'avatar': 'walter.jpg'
        type: 'kiuwanapp',
        styleClass: 'ui-person',
        expanded: true,
        children: []
      };
      projectNode.children = subAppsNodes;
    }

    // OS and Factory
    if(!this.uploadedFile.soData) {
        this.uploadedFile.soData = SASTRequest_OS[0];
    }

    let osNodes: TreeNode[] = new Array ( this.uploadedFile.soData.length );
    for (let i = 0; i < this.uploadedFile.soData.length; i++) {
      osNodes[i] = <TreeNode> {
        label : this.uploadedFile.soData[i].F_OSI,
        data: { factory: this.uploadedFile.soData[i].F_NAM, os : this.uploadedFile.soData[i].F_OST },
        type: 'os',
        styleClass: 'ui-person',
        expanded : true,
        children : [{
              label: 'Token',
              styleClass: 'department-cto'
            }]
      };
      subAppsNodes[i].children.push( osNodes[i] );
      subAppsNodes[i].children.push({
              label: 'Token',
              styleClass: 'department-cto'
            });
    }

    excelFileNode.children.push (projectNode);
    this.data1 = [];
    this.data1 = [excelFileNode];

    console.log ( 'OS:', JSON.stringify( this.uploadedFile.soData) );
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



