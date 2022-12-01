import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LogoutComponent } from './logout/logout.component';
import { LeaderboardsComponent } from './home/leaderboards/leaderboards.component';
import { ChatroomComponent } from './home/chatroom/chatroom.component';
import { SurveyComponent } from './home/survey/survey.component';
import { HighOrLowComponent } from './home/games/high-or-low/high-or-low.component';
import { TriviaCrackComponent } from './home/games/trivia-crack/trivia-crack.component';
import { HangmanComponent } from './home/games/hangman/hangman.component';
import { UsersOnlyComponent } from './users-only.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersOnlyRoutingModule } from './users-only-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule, DatePipe } from '@angular/common';
import { HangmanDisplayComponent } from './home/games/hangman/hangman-display/hangman-display.component';
import { HangmanKeyboardComponent } from './home/games/hangman/hangman-keyboard/hangman-keyboard.component';
import { HangmanQuestionComponent } from './home/games/hangman/hangman-question/hangman-question.component';
import { HttpClientModule } from '@angular/common/http';
import { HangmanService } from './home/games/hangman/services/hangman.service';
import { HolDisplayComponent } from './home/games/high-or-low/hol-display/hol-display.component';
import { DeckOfCardsService } from './home/games/high-or-low/services/deck-of-cards.service';
import { HolDefeatDialogComponent } from './home/games/high-or-low/hol-defeat-dialog/hol-defeat-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
//NGX Wheel
import { NgxWheelModule } from 'ngx-wheel';
import { TriviaService } from './home/games/trivia-crack/trivia.service';
import { TriviaCrackWheelComponent } from './home/games/trivia-crack/trivia-crack-wheel/trivia-crack-wheel.component';
import { TriviaCrackPanelComponent } from './home/games/trivia-crack/trivia-crack-panel/trivia-crack-panel.component';
import { RunAndJumpComponent } from './home/games/run-and-jump/run-and-jump.component';
import { UserListComponent } from './home/leaderboards/user-list/user-list.component';
import { ChatService } from 'src/app/services/chat.service';
import { NewSurveyComponent } from './home/survey/new-survey/new-survey.component';
import { SurveysService } from 'src/app/services/surveys.service';

@NgModule({
  declarations: [
    HomeComponent,
    MyProfileComponent,
    LogoutComponent,
    LeaderboardsComponent,
    ChatroomComponent,
    SurveyComponent,
    HighOrLowComponent,
    TriviaCrackComponent,
    HangmanComponent,
    UsersOnlyComponent,
    HangmanDisplayComponent,
    HangmanKeyboardComponent,
    HangmanQuestionComponent,
    HolDisplayComponent,
    HolDefeatDialogComponent,
    TriviaCrackWheelComponent,
    TriviaCrackPanelComponent,
    RunAndJumpComponent,
    UserListComponent,
    NewSurveyComponent
  ],
  entryComponents: [
    HolDefeatDialogComponent
  ],
  imports: [
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    UsersOnlyRoutingModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    NgxWheelModule
  ],
  providers:[HangmanService, DeckOfCardsService, TriviaService, DatePipe, ChatService, SurveysService],
  exports:[RouterModule]
})

export class UsersOnlyModule { }
