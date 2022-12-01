import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/Entities/survey';
import { SurveysService } from 'src/app/services/surveys.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  surveys : Survey[];
  gameScoreAverage : number;
  generalScoreAverage : number;
  
  constructor(private surveyService : SurveysService) { 
  }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(data =>{
      this.surveys = data;
      this.generalScoreAverage = this.surveys
        .map((s) => s.generalSatisfaction)
        .reduce((a, b) => a + b, 0) 
        / this.surveys.length;
      this.gameScoreAverage = this.surveys
        .map((s) => s.gameSatisfaction)
        .reduce((a, b) => a + b, 0) 
        / this.surveys.length;
    })
  }
}
