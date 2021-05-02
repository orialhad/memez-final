//region Imports
import {Injectable}      from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient}      from '@angular/common/http';
//endregion

@Injectable({
  providedIn: 'root'
})
export class AuthAdapter extends BaseAjaxAdapter {

  constructor(http: HttpClient) {
    super(http);
    window['loginAdapter'] = this;
  }

  async logout() {
    return await this.get('logout');
  }

  async validate(username, password) {
    return await this.post(`auth/login`, {'username': username, 'password': password});
  }

  async signup(username, password, email) {
    return await this.post('auth/signup', {'username': username, 'password': password, 'email': email});
  }

  async getPostByID(post_id: string) {
    return await this.get(`posts/${post_id} `);

  }


}
