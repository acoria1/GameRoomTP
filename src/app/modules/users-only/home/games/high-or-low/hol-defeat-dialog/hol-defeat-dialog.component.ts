import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hol-defeat-dialog',
  templateUrl: './hol-defeat-dialog.component.html',
  styleUrls: ['./hol-defeat-dialog.component.css']
})
export class HolDefeatDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
