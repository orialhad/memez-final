import { Injectable }      from '@angular/core';
import {BaseAjaxAdapter}   from './base.ajax.adapter';
import {HttpClient}        from '@angular/common/http';
import {IUser}             from '../../../../../../sheard/interfaces/IUser';
import {BaseSocketAdapter} from './base-socket.adapter';

@Injectable({
  providedIn: 'root'
})
export class UserAdapter extends BaseSocketAdapter{

  constructor() {
    super();
  }

  async getUsers(): Promise<IUser[]> {
    return this.request('getUsers');
  }

  // async createUser(user: IUser): Promise<IUser> {
  //   return this.request('createUser', {user});
  // }

  async editProfilePic(id: string , avatar: string): Promise<any>{
    return this.request(`editProfilePic`, {avatar:avatar, id: id} );
  }

}
