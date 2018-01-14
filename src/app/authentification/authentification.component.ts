/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/


import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from './authentification.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { AlertService } from './alert.service';
import  { ValidationService } from './validation.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    returnUrl: string;
    error: string;
    name: string;

    show = false;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private fb: FormBuilder,
      private alertService: AlertService,
    ){}

  ngOnInit() {
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || null;
      this.name = this.returnUrl && this.returnUrl.split('/').filter(str => str)[0];
      this.createForm();
      // reset login status
      this.authenticationService.logout();

  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.loginForm.value)
          .subscribe(
              data => {

                if( this.returnUrl  ){
                  this.router.navigate([this.returnUrl]);

              }else

                      this.router.navigate(['/accueil']);
              },
              error => {
                  /*this.snackBar.open("Email ou mot de passe incorrecte","",{
                    duration : 1000*/
                    console.log("Email ou mot de passe incorrecte");
                    this.loading = false;
              });
  }
  createForm(){
      this.loginForm = this.fb.group({
          email: ['', Validators.compose([Validators.required, ValidationService.emailValidator] )],
          password: ['', Validators.required]
      });

  }

  toggleShow(input :any)
  {
      this.show = !this.show;
      console.log(input); //undefined
      if (this.show){
          input.type = "text";
      }
      else {
             input.type = "password";
      }
  }
}

