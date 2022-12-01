import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Message } from '../Entities/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages : AngularFirestoreCollection<any>; 

  constructor(private _db : AngularFirestore) { 
    this.messages = this._db.collection('messages');
  }

  getMessages() : Observable<any>{
    return this.messages.valueChanges();
  }

  sendMessage(message : Message){
    return this.messages.add(JSON.parse(JSON.stringify(message)));
  }
}
