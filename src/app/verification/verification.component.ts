import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentification/authentification.service';
import { AlertService } from '../authentification/alert.service';
import { ValidationService } from '../authentification/validation.service';






@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
    verifierForm: FormGroup;
    loading = false;
    returnUrl: string;
    error: string;
    email:string ;
    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder,
        private alertService: AlertService
    ){}

    ngOnInit() {
        this.createForm();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.email = this.route.snapshot.queryParams['email'];
    

    }


    verifierCode() {
        this.loading = true;
        console.log(this.verifierForm.controls.email.value);
        console.log(this.verifierForm.controls.code.value);
        this.authenticationService.verifierCode(this.verifierForm.controls.email.value, this.verifierForm.controls.code.value)
            .subscribe(

                data => {
                    this.router.navigate(['/authentification']);
                },
                error => {
                    this.error = error;
                    this.alertService.error(error);
                    this.loading = false;

                });
    }
    createForm(){
        this.verifierForm = this.fb.group({
            email:['', Validators.compose([
                ValidationService.emailValidator])],
            code: ['', Validators.required]
        });

    }
}
