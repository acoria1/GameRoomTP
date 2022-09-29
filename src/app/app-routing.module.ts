import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  { path: 'public', loadChildren: () => import ('./modules/public/public.module').then(p=>p.PublicModule)},
  { path: 'users', loadChildren: () => import ('./modules/users-only/users-only.module').then(p=>p.UsersOnlyModule)},
  {path: '**', pathMatch : 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
