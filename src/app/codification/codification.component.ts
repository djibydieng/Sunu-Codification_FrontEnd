import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
@Component({
  selector: 'app-codification',
  templateUrl: './codification.component.html',
  styleUrls: ['./codification.component.css']
})
export class CodificationComponent implements OnInit {

  isLinear = true;
  myformGroup: FormGroup;
  /*secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;*/
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myformGroup = this.fb.group({
      firstCtrl:[""],
      secondCtrl:[""],
      thirdCtrl:[""],
      forthCtrl:[""]
    });
    /*this.secondFormGroup = this.fb.group({
     
    });
    this.thirdFormGroup = this.fb.group({
     
    });
    this.forthFormGroup = this.fb.group({
      
    });*/

}


}



