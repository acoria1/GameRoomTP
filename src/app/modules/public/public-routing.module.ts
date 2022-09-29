import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from 'src/app/components/about-me/about-me.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      // { path: '', redirectTo: '/login', pathMatch : 'full'},
      { path: 'about-me', component: AboutMeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },  
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule { }
