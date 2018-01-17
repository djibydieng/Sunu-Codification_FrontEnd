import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormGroupDirective,
  NgForm,
  FormArray
} from "@angular/forms";
import { EtudiantService } from '../service/etudiant.service';
import { Batiment } from '../models/batiment';
import { Etage } from '../models/etage';
import { Couloir } from '../models/couloir';
import { Chambre } from '../models/chambre';
import { Codification } from '../models/codification';
@Component({
  selector: 'app-codification',
  templateUrl: './codification.component.html',
  styleUrls: ['./codification.component.css']
})
export class CodificationComponent implements OnInit {
  codifications: Codification[];
  isLinear = true;
  myformGroup: FormGroup;
 // items:any[] =[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  batiments:Batiment[];
  etages:Etage[];
  couloirs:Couloir[];
  chambres: Chambre[];
  constructor(private fb: FormBuilder,private etudiantService:EtudiantService) { }

  ngOnInit() {
   /* this.myformGroup = this.fb.group({
      items: this.fb.array([ this.createItem() ])
      
    })*/
    this.firstFormGroup = this.fb.group({
      firstCtrl:[]
    })
    this.secondFormGroup = this.fb.group({
            secondCtrl:['']
    });
    this.thirdFormGroup = this.fb.group({
      thirdCtrl:['']
    });
    this.forthFormGroup = this.fb.group({
      forthCtrl:['']
    });
    this.loadAllBatiment();
    this.loadAllEtages();
    this.loadAllCouloirs();
    this.loadAllChambres();
    this.loadAllCodifications();

}

/*createItem(): FormGroup {
  return this.fb.group({
    firstCtrl:'',
      secondCtrl:'',
      thirdCtrl:'',
      forthCtrl:''
  });
}*/

loadAllBatiment():void{
  this.etudiantService.getAllBatiments().subscribe( batiments =>{
    this.batiments = batiments;

  })
}

loadAllEtages():void{
  this.etudiantService.getAllEtages().subscribe( etages =>{
    this.etages = etages;

  })
}

loadAllCouloirs():void{
  this.etudiantService.getAllCouloirs().subscribe( couloirs =>{
    this.couloirs = couloirs;

  })
}

loadAllChambres():void{
  this.etudiantService.getAllChambres().subscribe( chambres =>{
    this.chambres = chambres;

  })
}
loadAllCodifications():void{
  this.etudiantService.getAllCodifications().subscribe(codifications => {
      this.codifications = codifications;
  })

}
}



