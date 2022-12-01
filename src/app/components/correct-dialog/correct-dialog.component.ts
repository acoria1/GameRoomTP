import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-correct-dialog',
  templateUrl: './correct-dialog.component.html',
  styleUrls: ['./correct-dialog.component.css']
})
export class CorrectDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }
}
