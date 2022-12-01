import { Injectable, NgZone } from '@angular/core';
import { User } from '../Entities/user';
import { User as FireUser} from 'firebase/auth' ;
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GameScore, Score } from '../Entities/game-score';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  userData: FireUser;
  currentUser : User;
  currentUser2 : BehaviorSubject<User>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private _db : AngularFirestore
  ) {
    this.currentUser2 = new BehaviorSubject<User>(new User (
      "","user","",false,{creationTime:"",lastSignInTime:""},false,[]
    ));
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('auth', JSON.stringify(user));
        this._db.collection('users').doc(user.uid).get().subscribe(data => {
          localStorage.setItem('user', JSON.stringify(data.data()));
          this.currentUser = User.objToCustomUser(data.data());
          this.setCurrentUser(this.currentUser);
        });        
      } else {
        localStorage.setItem('auth', 'null');
        localStorage.setItem('user', 'null');
      }
    });
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser2.asObservable();
  }

  setCurrentUser(usr): void {
    this.currentUser2.next(usr);
  }

   // Returns true when user is looged in and email is verified
   get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('auth')!);
    return user !== null;
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.isAdmin;
  }


  SignIn(email: string, password: string) : Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


  // Sign up with email/password
  SignUp(email: string, password: string, username : string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({displayName : username})
        .then(()=>{
          this.SetUserData(result.user);
          this.router.navigate(['users/home']);
        });        
      })
      
  }

  SetUserData(user: FireUser, username? : string) {
    console.log("SET USER DATA");
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.set(JSON.parse( JSON.stringify(this.fireUserToCustomUser(user))), {
      merge: true,
    });
  }

  fireUserToCustomUser(user : FireUser) {
    return {
      email : user.email,
      displayName : user.displayName,
      photoURL : user.photoURL,
      emailVerified : user.emailVerified,
      metadata : 
      { 
        creationTime : user.metadata.creationTime!, 
        lastSignInTime : user.metadata.lastSignInTime
      },
      isAdmin : false,
      gameScores : [],
      uid : user.uid
    }
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
      this.router.navigate(['public/login']);
    });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['users']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  addGameResult (newScore : Score, gameName : string){
    console.log(newScore);
    this.currentUser.addScore(gameName, newScore);
    this._db.collection('users').doc(this.currentUser.uid).set(JSON.parse( JSON.stringify(this.currentUser)), {
      merge: true,
    });
    this.setCurrentUser(this.currentUser);
  }

  getUsers(){
    return this._db.collection('users').valueChanges();
  }

  // updateAllResults(){
  //   this.currentUser.gameScores.forEach(game => {
  //     this.updateGameResults(game.gameName);
  //   });
  // }

  // updateGameResults(gameName : string){
  //   this._db.collection('users').doc(this.currentUser.uid).collection('results').doc(gameName).set(JSON.parse(JSON.stringify (this.getGameByName(gameName))), {
  //     merge: true,
  //   });
  // }

  // getGameByName(gameName : string){
  //   return this.currentUser.gameScores.find(g => g.gameName == gameName);
  // }

  // initializeScores(){
  //   if (this.currentUser.gameScores == undefined){
  //     this.currentUser.gameScores = [];
  //   }
  // }
}