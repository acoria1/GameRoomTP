import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games = [
    {name: 'Hang Man', route: 'users/games/hangman', img : '' },
    {name: 'High Or Low', route: 'users/games/high-or-low', img : ''},
    {name: 'Trivia Crack', route: 'users/games/trivia-crack', img : ''},
    {name: 'Custom Game', route: 'users/games/no-route', img : ''},
  ]

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }

  navigateToGame(game : any){
    this._router.navigateByUrl(game.route);
  }

}
