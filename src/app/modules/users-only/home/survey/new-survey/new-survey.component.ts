import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/Entities/custom-validator';
import { Survey } from 'src/app/Entities/survey';
import { User } from 'src/app/Entities/user';
import { SurveysService } from 'src/app/services/surveys.service';
import { AuthService } from 'src/app/services/users.service';
import { surveyScores } from 'src/assets/constants/surveyScores';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent implements OnInit {

  public surveyForm! : FormGroup;
  currentUser : User;
  surveyScores;

  constructor(public surveyService: SurveysService, private fb: FormBuilder, private auth : AuthService) { 
    this.surveyScores = surveyScores;
  }

  ngOnInit(): void {

    this.surveyForm = this.fb.group({
      'firstName' :  ['', [Validators.required]],
      'lastName' : ['', [Validators.required]],
      'age' : ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'phone' : ['', [Validators.required, Validators.maxLength(10), CustomValidator.numberValidator]],
      'generalSatisfaction' : ['', [Validators.required]],
      'gameSatisfaction' : ['', [Validators.required]],'additionalComments' : '',
    });

    this.auth.getCurrentUser().subscribe(usr =>{
      this.currentUser = usr;
    })
  }

  submitSurvey(){
    console.log(this.constructSurvey());
    this.surveyService.submitSurvey(this.constructSurvey());
    this.resetForm();
  }

  constructSurvey() : Survey{
    return {
      uid : this.currentUser.uid,
      firstName : this.surveyForm.get('firstName').value,
      lastName : this.surveyForm.get('lastName').value,
      age : this.surveyForm.get('age').value,
      phone : this.surveyForm.get('phone').value,
      generalSatisfaction : this.surveyForm.get('generalSatisfaction').value,
      gameSatisfaction : this.surveyForm.get('gameSatisfaction').value,
      additionalComments : this.surveyForm.get('additionalComments').value,
      datetime : Date.now()
    }
  }

  resetForm(){
    this.surveyForm.reset();
    for (let control in this.surveyForm.controls) {
      this.surveyForm.controls[control].setErrors(null);
    }
  }
}
