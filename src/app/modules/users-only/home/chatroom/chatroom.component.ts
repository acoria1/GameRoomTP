import { DatePipe } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/Entities/message';
import { User } from 'src/app/Entities/user';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {

  currentUser : User;
  messages : Message[] = [];
  newMessage : String = "";

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  
  constructor(private chat : ChatService, private auth : AuthService) { }

  ngOnInit(): void {
    this.chat.getMessages().subscribe(data => {
      this.messages = data.sort(function (a : Message,b : Message){
        return a.datetime - b.datetime;
      });
    })
    this.auth.getCurrentUser().subscribe(usr =>{
      this.currentUser = usr;
    })
    this.scrollToBottom();    
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }

  scrollToBottom(): void {
    // try {
    //   console.log(this.myScrollContainer.nativeElement.scrollHeight)
    //     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    // } catch(err) { 
    //   console.log(err);
    // }                 
  }

  sendMessage(){
    this.chat.sendMessage(
      {
        uid : this.currentUser.uid,
        username : this.currentUser.displayName,
        message : this.newMessage,
        datetime : Date.now(),
        isAdmin : this.currentUser.isAdmin
      }
    )
    this.clearTextArea();
  }

  clearTextArea(){
    this.newMessage = "";
  }
}
