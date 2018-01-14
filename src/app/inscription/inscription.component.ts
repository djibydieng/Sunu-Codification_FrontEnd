import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../authentification/alert.service';
import { EtudiantService } from '../service/etudiant.service';
import { ValidationService } from '../authentification/validation.service';
import { User } from '../authentification/user';
import { Etudiant } from '../models/Etudiant';
import { Departement } from '../models/departement';
import { Niveau } from '../models/niveau';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  niveaux: Niveau[] = [];

  signupForm: FormGroup;
  loading: Boolean;
  error: string;
  departements:Departement[]=[];

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
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
        ""
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
          Validators.required,
          ValidationService.emailValidator
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          ValidationService.passwordValidator
        ])
      ],
      confirmP: [
        "",
        Validators.compose([
          Validators.required,
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
      data => {
        this.alertService.success("Registration successful", true);
        this.router.navigate([
          "/verifierCode",
          this.signupForm.controls.email.value
        ]);
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
}