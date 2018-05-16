import { UserService, AlertService } from '../_services/index';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators, NgModel} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { ReactiveFormsModule} from '@angular/forms'; 

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  //styleUrls: ['./register.component.css']
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
 
    register() {
        this.loading = true;

        console.log ("RegisterComponent.register()");

        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

