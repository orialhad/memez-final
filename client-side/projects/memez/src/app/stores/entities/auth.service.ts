import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {Router} from '@angular/router';
import {action, computed} from 'mobx-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUserInfo: {};

  constructor(
    public root: RootStore,
    private router: Router
  ) {
    this.root.authService = this;
    window['auth'] = this;
  }


  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  @action
  public async logout() {
    await this.root.authAdapter.logout();
    localStorage.clear()
    this.root.lis.currentUser = null
    await this.router.navigate(['login']);
  }

  public setUserInfo(user) {
    this.root.lis.currentUser = user.user
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public async validate(username, password) {
    return await this.root.authAdapter.validate(username, password);
  }

  public async signup(username, password) {
    return await this.root.authAdapter.signup(username, password);
  }

}
