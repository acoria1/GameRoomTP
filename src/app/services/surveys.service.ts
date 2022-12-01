import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Survey } from '../Entities/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  surveys : AngularFirestoreCollection<any>; 

  constructor(private _db : AngularFirestore) { 
    this.surveys = this._db.collection('surveys');
  }

  getSurveys() : Observable<any>{
    return this.surveys.valueChanges();
  }

  submitSurvey(survey : Survey){
    return this.surveys.add(JSON.parse(JSON.stringify(survey)));
  }
}
