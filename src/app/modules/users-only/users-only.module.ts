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
import { CommonModule } from '@angular/common';
import { HangmanDisplayComponent } from './home/games/hangman/hangman-display/hangman-display.component';
import { HangmanKeyboardComponent } from './home/games/hangman/hangman-keyboard/hangman-keyboard.component';
import { HangmanQuestionComponent } from './home/games/hangman/hangman-question/hangman-question.component';
import { HttpClientModule } from '@angular/common/http';
import { HangmanService } from './home/games/hangman/services/hangman.service';
import { HolDisplayComponent } from './home/games/high-or-low/hol-display/hol-display.component';
import { DeckOfCardsService } from './home/games/high-or-low/services/deck-of-cards.service';
import { HolDefeatDialogComponent } from './home/games/high-or-low/hol-defeat-dialog/hol-defeat-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


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
    HolDefeatDialogComponent
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
  ],
  providers:[HangmanService, DeckOfCardsService],
  exports:[RouterModule]
})

export class UsersOnlyModule { }
