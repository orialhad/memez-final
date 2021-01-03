import { Injectable } from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../../../../../sheard/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserAdapter extends BaseAjaxAdapter{

  constructor(http:HttpClient) {
    super(http);
  }

  async getUsers(): Promise<IUser[]> {
    return this.get('users');
  }

  async createNewUser(user: IUser): Promise<IUser> {
    return this.post('users', user);
  }

  async editProfilePic(id: string , avatar: string): Promise<any>{
    return this.post_avatar(`editProfilePic/${id}`, {avatar:avatar} );
  }

}
