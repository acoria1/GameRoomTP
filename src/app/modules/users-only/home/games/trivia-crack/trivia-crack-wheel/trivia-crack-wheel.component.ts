import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent } from 'ngx-wheel';
import { Output } from '@angular/core';

@Component({
  selector: 'app-trivia-crack-wheel',
  templateUrl: './trivia-crack-wheel.component.html',
  styleUrls: ['./trivia-crack-wheel.component.css']
})
export class TriviaCrackWheelComponent implements OnInit {

  @ViewChild(NgxWheelComponent, {static: false}) wheel;

  spinning : boolean = false;
  idToLandOn : Number;
  categories = [
    {id:1, text: 'Science',fillStyle: "green", code: 17},
    {id:2, text: 'Sports',fillStyle: "red", code: 21},
    {id:3, text: 'Geography',fillStyle: "purple", code : 22},
    {id:4, text: 'History',fillStyle: "yellow", code: 23},
    {id:5, text: 'Art',fillStyle: "pink", code: 25},
    {id:6, text: 'Math',fillStyle: "blue", code: 19},
  ];
  
  @Output() idCategoriaSelecEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
  }

  get currCategory(){
    return this.categories.find(c=> c.id == this.idToLandOn);
  }

  getTriviaQuestion(){
    this.toggleSpinEnable();
    this.setRandomCategory();
    this.spinWheel();
  }

  toggleSpinEnable(){
    this.spinning = !this.spinning;
  }

  setRandomCategory(){
    this.idToLandOn = Math.ceil(Math.random() * this.categories.length);
  }  

  async spinWheel(){
    this.wheel.reset();
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin();
  }

  afterWheelAnimation(){
    this.toggleSpinEnable();
    this.idCategoriaSelecEvent.emit(this.currCategory.code!);    
  }
}
