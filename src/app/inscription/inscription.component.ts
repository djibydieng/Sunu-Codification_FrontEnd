import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../authentification/alert.service';
import { EtudiantService } from '../service/etudiant.service';
import { ValidationService } from '../authentification/validation.service';
import { User } from '../authentification/user';
import { Etudiant } from '../models/Etudiant';
import { Departement } from '../models/departement';
import { Niveau } from '../models/niveau';
import { ErrorStateMatcher } from '@angular/material';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  niveaux: Niveau[] = [];
  value='click';
  signupForm: FormGroup;
  loading: Boolean;
  error: string;
  departements:Departement[]=[];
  etudiant:Etudiant;

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private alertService: AlertService,
    private router: Router
  ) {
      this.createForm();
   // this.resetEtudiant();
  }

  /*emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);*/

  matcher = new MyErrorStateMatcher();
  
  ngOnInit() {
   // this.createForm();
   //this.resetEtudiant();
    this.getDepartements();
    this.getNiveaux();
  }

  getDepartements()
  {
      this.etudiantService.getAllDepartements().subscribe(departements =>{
      this.departements = departements;
    });
   
  }
  getNiveaux()
  {
      this.etudiantService.getAllNiveaux().subscribe(niveaux =>{
      this.niveaux = niveaux;
    });
   
  }
  createForm() {
    this.signupForm = this.fb.group({
      nom:[
        ""
      ],
      prenom:[
        ""
      ],
      sexe:[
        "",
        Validators.compose([
          Validators.required])
      ],
      cni:[
        "",
        Validators.compose([
          Validators.required])
      ],
      ce:[
        "",
        Validators.compose([
          Validators.required])
      ],
      departement:[
      "",
      Validators.compose([
        Validators.required])
      ],
      niveau:[
        "",
        Validators.compose([
          Validators.required])
        ],
      email: [
        "",
        Validators.compose([
          ValidationService.emailValidator
        ])
      ],
      password: [
        "",
        Validators.compose([
          ValidationService.passwordValidator
        ])
      ],
      confirmP: [
        "",
        Validators.compose([
          ValidationService.passwordValidator
        ])
      ],
    });
  }
  register() {
    this.loading = true;

    let observable;
    var user = new Etudiant();
    user.nom = this.signupForm.value.nom;
    user.prenom = this.signupForm.value.prenom;
    user.sexe = this.signupForm.value.sexe;
    user.numCIN = this.signupForm.value.cni;
    user.numCE = this.signupForm.value.ce;
    user.departementId = this.signupForm.value.departement;
    user.niveauId = this.signupForm.value.niveau;
    user.email = this.signupForm.value.email;
    user.password = this.signupForm.value.password;
    user.emailVerified = false;
    observable = this.etudiantService.create(user);
    observable.subscribe(
      //this.etudiantService.create(user).subscribe(
      data => {
        this.alertService.success("Registration successful", true);
        this.router.navigate(["/verifierCode",this.signupForm.controls.email.value]);
      },
      error => {
        this.alertService.error(error);
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        this.loading = false;
        this.error = error;
      }
    );
  }
 /* resetEtudiant():void {
    this.etudiant = new Etudiant({id:"",nom:"",prenom:"",sexe:"",numCNI:"",departementId:"",niveauId:"",email:"",password:"",emailVerified:false});
  }*/
}