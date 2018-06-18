import { UserService, AlertService } from '../_services/index';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators, NgModel} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class RegisterErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
 
    fisrtNameFormControl: FormControl;
    lastNameFormControl: FormControl;
    userNameFormControl: FormControl;
    passwdFormControl: FormControl;
    emailFormControl: FormControl;

    kiuUserNameFormControl: FormControl;
    kiuPasswdFormControl: FormControl;
    fodUserNameFormControl: FormControl;
    fodPasswdFormControl: FormControl;
    

    matcher: RegisterErrorStateMatcher;
    
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) 
    {
        this.fisrtNameFormControl = new FormControl('', [
            Validators.required
        ]);
        this.lastNameFormControl = new FormControl('', [
            Validators.required
        ]);
        
        this.userNameFormControl = new FormControl('', [
            Validators.required
        ]);
  
        this.passwdFormControl = new FormControl('', [
            Validators.required
        ]);

        this.emailFormControl = new FormControl('', [
            Validators.required, Validators.email
        ]);


        this.kiuUserNameFormControl = new FormControl('', [
            Validators.required
        ]);
  
        this.kiuPasswdFormControl = new FormControl('', [
            Validators.required
        ]);


        this.fodUserNameFormControl = new FormControl('', [
            Validators.required
        ]);
  
        this.fodPasswdFormControl = new FormControl('', [
            Validators.required
        ]);
        
  
        this.matcher = new RegisterErrorStateMatcher();


    }
 
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

