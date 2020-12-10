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

  async createNewUser(userName): Promise<IUser> {
    return this.post('users', userName);
  }

}
