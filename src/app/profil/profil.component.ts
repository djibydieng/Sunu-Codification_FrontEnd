import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { EtudiantService } from '../service/etudiant.service';
import { Etudiant } from '../models/Etudiant';

import { ValidationService } from '../authentification/validation.service';
import { AlertService } from '../authentification/alert.service';
import { Router } from '@angular/router';
import { Niveau } from '../models/niveau';
import { Departement } from '../models/departement';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  error: any;
  userId = JSON.parse(localStorage.getItem('currentUser')).userId;
  etudiant: Etudiant;
  niveau: Niveau;
  departements:Departement[];
  niveaux: Niveau[];
  myForm : FormGroup;
  loading:boolean;
ready:boolean;
  constructor(private etudiantService:EtudiantService,private fb:FormBuilder,
              private alertService:AlertService,
            private router:Router) { 
    this.createForm();
  }
 
  ngOnInit() {
    this.loadEtudiant();
    this.getDepartements();
    this.getNiveaux();
    
  }

 
  loadEtudiant():void
  {
    this.etudiantService.getEtudiantById(this.userId).subscribe(etudiant => {
      this.etudiant = etudiant;
      this.ready = true;
    })
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

  createForm():void {
    this.myForm = this.fb.group({
      id:[
        "",
        Validators.compose([
          Validators.required])
      ],
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
      password:[
        "",
        Validators.compose([
          Validators.required])
      ]
    })
  }

  updateEtudiant() {
    this.loading = true;

    let observable;
    var user = new Etudiant();
    user.id = this.myForm.value.id;
    user.nom = this.myForm.value.nom;
    user.prenom = this.myForm.value.prenom;
    user.sexe = this.myForm.value.sexe;
    user.numCIN = this.myForm.value.cni;
    user.numCE = this.myForm.value.ce;
    user.departementId = this.myForm.value.departement;
    user.niveauId = this.myForm.value.niveau;
    user.email = this.myForm.value.email;
    user.password = this.myForm.value.password;
    user.emailVerified = true;
    
    
    observable = this.etudiantService.updateProfile(user);
    observable.subscribe(
      //this.etudiantService.create(user).subscribe(
      data => {
        this.alertService.success("Modification successful", true);
        this.router.navigate(["/accueil"]);
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
