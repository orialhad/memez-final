import {Injectable}        from '@angular/core';
import {BaseAjaxAdapter}   from './base.ajax.adapter';
import {HttpClient}        from '@angular/common/http';
import {IUser}             from '../../../../../../sheard/interfaces/IUser';
import {BaseSocketAdapter} from './base-socket.adapter';

@Injectable({
  providedIn: 'root'
})
export class UserAdapter extends BaseSocketAdapter {

  constructor() {
    super();
  }

  async getUsers(): Promise<IUser[]> {
    return this.request('getUsers');
  }

  async getUserById(id): Promise<IUser> {
    return this.request('getUser', id);
  }

  async editProfilePic(id: string, avatar: string): Promise<any> {
    return this.request(`editProfilePic`, {avatar: avatar, id: id});
  }


  async editEmail(id: string, email: string): Promise<any> {
    try {
      return this.request(`editEmail`, {email: email, id: id});
    }catch (e) {
      console.error(e)
    }
  }
}
