import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Entities/user';
import { UserScore } from '../leaderboards.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() userScores? : UserScore[];  

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  displayedColumns: string[] = ['rank','displayName','score'];
  dataSource! : MatTableDataSource<UserScore>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource (this.userScores);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["userScores"] && !changes["userScores"].isFirstChange()){
      this.dataSource.data = this.userScores!;
    }   
  }

}
