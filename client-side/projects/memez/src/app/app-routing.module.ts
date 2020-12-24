import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './views/layout/layout.component';
import {FeedComponent} from './views/feed/feed.component';
import {LoginComponent} from './views/login/login.component';
import {UserProfileComponent} from './views/user-profile/user-profile.component';
import {SignupComponent} from './views/singup/signup.component';
import {UploadComponent} from './reusable-components/upload/upload.component';
import {AuthGuardService} from './stores/entities/auth-gurad.service';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent,

  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate : [AuthGuardService]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
