import { Injectable } from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../types/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserAdapter extends BaseAjaxAdapter{

  constructor(http:HttpClient) {
    super(http);
  }

  async getUsers(): Promise<IUser[]> {
    return this.request('users');
  }

  async createNewUser(user: IUser): Promise<IUser> {
    // const newUser : IUser = {userName:userName ,password:password}
    return this.post('users', user);
  }

}
