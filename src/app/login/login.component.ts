import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators, NgModel} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { ReactiveFormsModule} from '@angular/forms'; 


/** Error when invalid control is dirty, touched, or submitted. */
export class AppErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  // moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading= false;
    returnUrl: string;
  
    // emailFormControl: FormControl;
    userNameFormControl: FormControl;
    passwdFormControl: FormControl;

    matcher: AppErrorStateMatcher;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        console.log("LoginComponent.constructor()");

        this.userNameFormControl = new FormControl('', [
          Validators.required
        ]);

        this.passwdFormControl = new FormControl('', [
          Validators.required
        ]);

        this.matcher = new AppErrorStateMatcher();
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();      /* Clear local storage current user info */

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        console.log("LoginComponent.login()")
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log("LoginComponent.login()-> navegar a " + this.returnUrl );
                    this.router.navigate([this.returnUrl]);
                    this.alertService.error("Login OK");
                  this.loading = false;
                },
                error => {
                    console.log("LoginComponent.login()->error=" + JSON.stringify(error));
                    this.alertService.error(/* JSON.stringify(error) ; error.error*/ "Login failed" );// @aaa TODO add message service call
                    this.loading = false;
                });
    }
}


//this.emailFormControl = new FormControl('', [
//          Validators.required,
//          Validators.email
//        ]);