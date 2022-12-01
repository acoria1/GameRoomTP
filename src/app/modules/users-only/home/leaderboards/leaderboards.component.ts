import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Entities/user';
import { AuthService } from 'src/app/services/users.service';

export interface UserScore{
  rank : Number;
  displayName : String;
  score : Number;
}

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit, AfterViewChecked, OnDestroy {

  users : User[] = [];
  userScores : UserScore[];
  subRef : Subscription;
  games : string[] = ['HighOrLow','RunAndJump', 'TriviaCrack'];
  selectedGame : string;

  constructor(private usersService : AuthService, private cdRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedGame = this.games[0];
    this.getUsersByGame(this.games[0]);
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  getUsersByGame(gameName : string){
    this.subRef = this.usersService.getUsers().subscribe((data : User[]) => {
      this.users = [];
      data.forEach(u => {
        this.users.push(User.objToCustomUser(u));
      })
      this.userScores = this.users
      .filter(usr => {
        return usr.highScoreByGame(gameName) != undefined        
        } 
      )
      .sort(function(a,b){
        return b.highScoreByGame(gameName) - a.highScoreByGame(gameName)
      })
      .map((usr, index) => {
        return {
          rank : index + 1,
          displayName : usr.displayName,
          score : usr.highScoreByGame(gameName)
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.subRef.unsubscribe();
  }
}
