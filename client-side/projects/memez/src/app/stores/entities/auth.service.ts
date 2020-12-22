import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RootStore} from '../root.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUserInfo : {};
  constructor(
    public root: RootStore
  ) {
    this.root.authService = this;
    window['auth'] = this;
  }


  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public setUserInfo(user){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  // public validate(userName, password) {
  //   return this.root.loginAdapter.validate(userName,password)
  // }

}
