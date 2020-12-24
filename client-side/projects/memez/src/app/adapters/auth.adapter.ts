import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../types/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthAdapter extends BaseAjaxAdapter {

  constructor(http: HttpClient) {
    super(http);
    window['loginAdapter'] = this;
  }


  // async login(user: IUser) {
  //   return await this.post('login', user);
  // }

  // async logout() {
  //   return this.request('logout');
  // }

  async validate(userName, password) {
    return await this.post(`auth/login`, {'userName': userName, 'password': password});
  }

  async signup(userName, password){
    return await this.post('auth/signup', {'userName' : userName, 'password' : password},)
  }



}
