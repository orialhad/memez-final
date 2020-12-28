import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {Router} from '@angular/router';


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

  public async logout() {
    await this.root.authAdapter;
    await this.router.navigate(['login']);
  }

  public setUserInfo(user) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public async validate(username, password) {
    return await this.root.authAdapter.validate(username, password);
  }

  public async signup(username, password) {
    return await this.root.authAdapter.signup(username, password);
  }
}
