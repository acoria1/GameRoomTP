import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { HolDefeatDialogComponent } from '../high-or-low/hol-defeat-dialog/hol-defeat-dialog.component';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/users.service';
import { Score } from 'src/app/Entities/game-score';

@Component({
  selector: 'app-run-and-jump',
  templateUrl: './run-and-jump.component.html',
  styleUrls: ['./run-and-jump.component.css']
})
export class RunAndJumpComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('character') character!: ElementRef;
  @ViewChild('block') block!: ElementRef;

  animate = false;
  counter = 0;
  score = 0;
  // character : any;
  // block : any;
  checkDead : any;
  
  constructor(public defeatDialog : MatDialog, private _router : Router, private usersService : AuthService, private datePipe : DatePipe) {  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == ' '){
      this.jump();
    }
  }

  jump(){
    if(this.animate){return}
    this.animate = true;
    setTimeout(()=>{
      this.animate = false;
    },300);
  }  

  ngOnInit(): void {    
  }

  ngAfterViewInit(){
    this.initializeGame();
  }

  initializeGame(){
    this.checkDead = setInterval(() => this.checkDeadFunc(), 10);
  }

  checkDeadFunc(){
      if(this.characterCollidedWithBlock()){
        clearInterval(this.checkDead);
        this.block.nativeElement.style.animation = "none";
        this.usersService.addGameResult(this.getScore(), 'RunAndJump');
        this.openDefeatDialog({data : { score : this.score}});
      }else{
          this.counter++;
          this.score = Math.floor(this.counter/10);
      }
  }

  characterCollidedWithBlock() : boolean {
    let characterTop = this.character.nativeElement.offsetTop;
    let characterLeft = this.character.nativeElement.offsetLeft;
    let blockLeft = this.block.nativeElement.offsetLeft;
    return (blockLeft>= characterLeft-5) && (blockLeft<= characterLeft+42) && characterTop>316
  }

  async openDefeatDialog(data : {data :{ score : number}}){
    let dialogRef = this.defeatDialog.open(HolDefeatDialogComponent, data);
    let playAgain = await lastValueFrom(dialogRef.afterClosed());
    if(playAgain == "true"){
      this.reset();
    } else {
      this._router.navigateByUrl('/users/home');
    }
  }

  reset(){
    this.counter = 0;
    this.block.nativeElement.style.animation = "block 1.5s infinite linear";
    this.initializeGame();
  }

  getScore() : Score{
    return { 
      date : this.datePipe.transform(Date.now(),'dd-MM-yyyy'), 
      score : this.score
    }
  }

  ngOnDestroy() {
    clearInterval(this.checkDead);
  }
}
