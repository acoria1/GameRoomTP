import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'src/app/Entities/feature';

@Component({
  selector: 'app-trivia-crack-panel',
  templateUrl: './trivia-crack-panel.component.html',
  styleUrls: ['./trivia-crack-panel.component.css']
})
export class TriviaCrackPanelComponent implements OnInit {

  @Input() buttons : string[];
  @Input() classWrapper : string = "";
  @Input() columns : number = 2;
  @Output() buttonClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonSelected(button : string){
    this.buttonClicked.emit(button);
  }

}
