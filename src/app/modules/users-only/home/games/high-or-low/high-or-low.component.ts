import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Card } from './entities/card';
import { HolDefeatDialogComponent } from './hol-defeat-dialog/hol-defeat-dialog.component';
import { DeckOfCardsService } from './services/deck-of-cards.service';

const CARD_SEPARATION_PX = 10;
const INITIAL_CARD_POSITION_PX = 280;

type HighLow = 'High' | 'Low';

@Component({
  selector: 'app-high-or-low',
  templateUrl: './high-or-low.component.html',
  styleUrls: ['./high-or-low.component.css']
})

export class HighOrLowComponent implements OnInit {

  deck_id : string;
  cards : 
  { info : Card;
    rawValue : number;
    absolutePosition : number;    
  }[] = [];
  selectedValue : HighLow;
  defeat = false;

  constructor(private _cardsService : DeckOfCardsService, public defeatDialog : MatDialog, private _router : Router) { }

  ngOnInit(): void {
    this._cardsService.getNewDeck().subscribe((response)=>{
        this.deck_id = response.deck_id;
        this.getNewCard();
    });
  }

  get previousCard() : number{
    return this.cards[this.cards.length - 2].rawValue;
  }

  get currentCard() : number{
    return this.cards[this.cards.length - 1].rawValue;
  }

  get score() : number {
    return this.cards.length - 2;
  }

  getNewCard(){
    this._cardsService.drawCard(this.deck_id).subscribe((response)=>{
        this.cards.push({ 
          info : response.cards[0], 
          rawValue : this.getRawValue(response.cards[0]),
          absolutePosition : this.getCardTopMargin()          
        });
    });
  }

  getCardTopMargin() : number {
     return this.cards.length > 0 ? 
     this.cards[this.cards.length - 1].absolutePosition + CARD_SEPARATION_PX :
      INITIAL_CARD_POSITION_PX
  }

  reset(){
    this.cards.length = 0;
    this._cardsService.getNewDeck().subscribe((response)=>{
      this.deck_id = response.deck_id;
      this.getNewCard();
    });
  }

  getRawValue(card : Card) : number{
    switch (card.value) {
      case 'JACK':
        return 11;
      case 'QUEEN':
        return 12;
      case 'KING':
        return 13;
      case 'ACE':
        return 14;
      default : 
      return Number(card.value);
    }
  }

  async handleAskForCard(selected : HighLow){
    const source$ = this._cardsService.drawCard(this.deck_id)
    const response = await lastValueFrom(source$);
    this.cards.push({ 
        info : response.cards[0], 
        rawValue : this.getRawValue(response.cards[0]),
        absolutePosition : this.getCardTopMargin()          
    });
    if (this.playerGuessedWrong(selected)){
        this.openDefeatDialog({data : { score : this.score}});
    }
  }

  openDefeatDialog(data : {data :{ score : number}}){
    let dialogRef = this.defeatDialog.open(HolDefeatDialogComponent, data);
    dialogRef.afterClosed().subscribe((playAgain) => {
      if(playAgain == "true"){
        this.reset();
      } else {
        this._router.navigateByUrl('/users/home');
      }
    })
  }

  playerGuessedWrong(selected : HighLow){
    return this.currentCard > this.previousCard && selected == 'Low' 
    || this.currentCard < this.previousCard && selected == 'High'
  }
}
