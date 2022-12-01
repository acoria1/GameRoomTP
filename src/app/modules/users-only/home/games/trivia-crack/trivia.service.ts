import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http: HttpClient) {}

  getCategories(){
    return this.http.get("https://opentdb.com/api_category.php");
  }

  getQuestion(catCode : number) {
    return this.http.get<{ response_code : any, results? : any }>("https://opentdb.com/api.php", {
      params : {
        amount : 1,
        category : catCode,
        difficulty : "medium",
        type : "multiple"
      }
    });
  }

}
