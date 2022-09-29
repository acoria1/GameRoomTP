import { Component, OnInit } from '@angular/core';

import { 
  Auth, 
  createUserWithEmailAndPassword, 
} from '@angular/fire/auth';
import { 
  addDoc,
  Firestore,
  collection 
} from '@angular/fire/firestore';

import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// import { User } from 'src/app/Entities/user';
import { AuthService } from 'src/app/services/users.service';

import { CustomValidator } from 'src/app/Entities/custom-validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  hidePassword : Boolean[] = [true,true];
  matcher = new MyErrorStateMatcher();
  public registerForm! : FormGroup;
  emailAlreadyInUse = false;

  // constructor(public auth: Auth, public firestore: Firestore, private fb: FormBuilder) { }
  constructor(public auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'username' :  ['', [Validators.required, CustomValidator.spacesValidator]],
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]],
      'confirmPassword' : ['']
    }, { validators: CustomValidator.checkPasswords});
    
    this.registerForm.valueChanges.subscribe(()=>{
      this.emailAlreadyInUse = false;
    })
  }

  togglePasswordVisibility(index : number){
    this.hidePassword[index] = !this.hidePassword[index];
  }

  // handleRegister(){
    // const user = this.getFormUser();

    // createUserWithEmailAndPassword(this.auth,user.email, user.password)
    // .then((response)=>{
    //   this.addUserToDatabase(JSON.parse(JSON.stringify(user.withoutPassword())));
    // }).catch((e)=>{
    //   console.log(`Failed with error code: ${e.code}`);
    // }        
    // );   
  // }

  handleRegister(){
    this.auth.SignUp(
      this.registerForm.get('email')!.value,
      this.registerForm.get('password')!.value,
      this.registerForm.get('username')!.value)
      .catch((error) => {
        if (error.code === "auth/email-already-in-use"){
          this.emailAlreadyInUse = true;
        }
      });
  }

  // addUserToDatabase(value : any){
    // const dbInstance = collection(this.firestore, 'users');
    // addDoc(dbInstance, value)
    //   .then(()=>{
    //     console.log('Data Sent');
    //   })
    //   .catch((e)=>{
    //     console.log(e.message);
    //   })
  // }
}
