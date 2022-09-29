import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../entities/card';

@Component({
  selector: 'app-hol-display',
  templateUrl: './hol-display.component.html',
  styleUrls: ['./hol-display.component.css']
})
export class HolDisplayComponent implements OnInit {

  @Input() cards : Card[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
