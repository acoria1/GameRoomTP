import { NgModule } from '@angular/core';
import { UsersOnlyComponent } from './users-only.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LeaderboardsComponent } from './home/leaderboards/leaderboards.component';
import { ChatroomComponent } from './home/chatroom/chatroom.component';
import { SurveyComponent } from './home/survey/survey.component';
import { HighOrLowComponent } from './home/games/high-or-low/high-or-low.component';
import { TriviaCrackComponent } from './home/games/trivia-crack/trivia-crack.component';
import { HangmanComponent } from './home/games/hangman/hangman.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from 'src/app/components/about-me/about-me.component';

const routes: Routes = [
  {
    path: '',
    component: UsersOnlyComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'about-me', component: AboutMeComponent},
      {path: 'my-profile', component:MyProfileComponent},
      {path: 'leaderboards', component:LeaderboardsComponent},
      {path: 'chatroom', component:ChatroomComponent},
      {path: 'survey', component:SurveyComponent},
      {path: 'games/high-or-low',component:HighOrLowComponent},
      {path: 'games/trivia-crack', component:TriviaCrackComponent},
      {path: 'games/hangman', component:HangmanComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersOnlyRoutingModule { }
