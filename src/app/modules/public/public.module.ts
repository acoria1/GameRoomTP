import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicComponent } from './public.component';
import { RouterModule} from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicRoutingModule } from './public-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PublicComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    // BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
  ],
  providers: [],
  exports: [RouterModule]
})
export class PublicModule { }
