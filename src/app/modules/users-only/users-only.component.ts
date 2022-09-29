import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-only',
  templateUrl: './users-only.component.html',
  styleUrls: ['./users-only.component.css']
})

export class UsersOnlyComponent implements OnInit {
  
  constructor(public auth: AuthService, private _router : Router) { }

  ngOnInit(): void {
    this._router.navigate(['/users/home']);
  }

  handleLogOut(){
    this.auth.SignOut();
  }

}
