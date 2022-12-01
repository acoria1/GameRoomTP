import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games = [
    {name: 'Hang Man', route: 'users/games/hangman', img : '../../../../assets/images/hangman_min.png' },
    {name: 'High Or Low', route: 'users/games/high-or-low', img : '../../../../assets/images/high_low_min.png'},
    {name: 'Trivia Crack', route: 'users/games/trivia-crack', img : '../../../../assets/images/trivia_crack_min.png'},
    {name: 'Run & Jump', route: 'users/games/run-and-jump', img : '../../../../assets/images/mummy-normal_origin.png'},
  ]

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }

  navigateToGame(game : any){
    this._router.navigateByUrl(game.route);
  }

}
