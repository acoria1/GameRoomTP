import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Entities/user';
// import { 
//   Auth, 
//   signInWithEmailAndPassword
// } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/users.service';
import { MOCK_USERS_DATA } from 'src/assets/constants/mock-users';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user!: User;
  hidePassword : Boolean = true;
  public loginForm! : FormGroup;
  invalidCredentials : boolean = false;

  // constructor(public auth: Auth, private fb: FormBuilder, private _router : Router) { }
  constructor(public auth: AuthService, private fb: FormBuilder, private _router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email' :  ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required]]
    })
    this.loginForm.valueChanges.subscribe(()=>{
      this.invalidCredentials = false;
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  // handleLogIn(){
  //   this.auth.SignIn(
  //     this.loginForm.get('email')!.value,
  //     this.loginForm.get('password')!.value)
  // }

  handleLogIn(){
    this.auth.SignIn(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value)
      .then((result) => {
        this.auth.SetUserData(result.user);
        this.auth.afAuth.authState.subscribe((user) => {
          console.log(user);
          if (user) {
            this._router.navigate(['users/home']);
          }
        });
      })
      .catch((error) => {
        this.invalidCredentials = true;
        console.log(error);
      });
  }

  handleGoogleAuth(){
    this.auth.GoogleAuth(); 
  }

  setMockUser(index : number){
    this.loginForm.get('email')?.setValue(MOCK_USERS_DATA[index].email);
    this.loginForm.get('password')?.setValue(MOCK_USERS_DATA[index].password);
  }
}

