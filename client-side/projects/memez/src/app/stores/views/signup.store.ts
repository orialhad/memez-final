import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';
import {IUser} from '../../types/interfaces/IUser';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignupStore {
  @observable newUser: string = ``;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.sus = this;
    window['sus'] = this;
  }

  @action async signUpUser(username: string,password:string,password2:string){
    username = username.toLowerCase()
    if(password === password2) {
       await this.root.authService.signup(username, password)
       await this.loginNavigation()
      console.log("User Created")
    }else {
      console.log("Password doesn't match")
    }
  }

  @action async loginNavigation() {
    await this.router.navigateByUrl(``)
  }

}
