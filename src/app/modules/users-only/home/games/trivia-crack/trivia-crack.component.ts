import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxWheelComponent } from 'ngx-wheel';
import { HolDefeatDialogComponent } from '../high-or-low/hol-defeat-dialog/hol-defeat-dialog.component';
import { CorrectDialogComponent } from 'src/app/components/correct-dialog/correct-dialog.component';
import { TriviaService } from './trivia.service';
import { TriviaQuestion } from 'src/app/Entities/trivia-question';
import { AuthService } from 'src/app/services/users.service';
import { DatePipe } from '@angular/common';
import { Score } from 'src/app/Entities/game-score';

@Component({
  selector: 'app-trivia-crack',
  templateUrl: './trivia-crack.component.html',
  styleUrls: ['./trivia-crack.component.css']
})
export class TriviaCrackComponent implements OnInit, AfterViewInit {

  constructor(private triviaService : TriviaService, public dialog : MatDialog, private _router : Router, private usersService : AuthService, private datePipe : DatePipe) { }

  answers : string[] = [];
  score = 0;
  loadingQuestion = false;
  triviaQuestion : TriviaQuestion;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
  }

  setQuestion(idCategory : number){
    this.loadingQuestion = true;
    this.triviaService.getQuestion(idCategory).subscribe((data)=>{
      this.triviaQuestion = data.results[0];
      console.log(this.triviaQuestion);
      this.answers = this.shuffleAnswers(data.results[0].correct_answer, ...data.results[0].incorrect_answers);
      this.loadingQuestion = false;
    })
  }

  shuffleAnswers(...ans : string[]) : string[]{
    let currentIndex = ans.length,  randomIndex;

    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // swap it with the current element.
      [ans[currentIndex], ans[randomIndex]] = [ans[randomIndex], ans[currentIndex]];
    }

    return ans;

  }

  answerSelected( ans : string){
    if(ans === this.triviaQuestion.correct_answer){
      this.openCorrectAnswerDialog();
    } else {
      this.usersService.addGameResult(this.getScore(), 'TriviaCrack');
      this.openDefeatDialog({data : { score : this.score}});
    }
  }

  openDefeatDialog(data : {data :{ score : number}}){
    let dialogRef = this.dialog.open(HolDefeatDialogComponent, data);
    dialogRef.afterClosed().subscribe((playAgain) => {
      if(playAgain == "true"){
        this.reset();
        this.score = 0;
      } else {
        this._router.navigateByUrl('/users/home');
      }
    })
  }

  openCorrectAnswerDialog(){
    let dialogRef = this.dialog.open(CorrectDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.score++;
      this.reset();
      }
    )
  }

  reset (){
    this.triviaQuestion = undefined;
    this.answers = [];
  }

  getScore() : Score{
    return { 
      date : this.datePipe.transform(Date.now(),'dd-MM-yyyy'), 
      score : this.score
    }
  }
}
