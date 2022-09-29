import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../entities/card';


@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsService {

  constructor(private http: HttpClient) { }

  getNewDeck(){
    return this.http.get<{success : string, deck_id : string, shuffled : string , remaining : string }>("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  }

  drawCard(deckId : string){
    return this.http.get<{success : string, deck_id : string, cards : Card[], remaining : string }>(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  }

  reshuffleDeck(deckId : string){
    return this.http.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
  }

}
