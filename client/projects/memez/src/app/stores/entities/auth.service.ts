//region Imports
import {Injectable} from '@angular/core';
import {RootStore}  from '../root.store';
import {Router}     from '@angular/router';
//endregion


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    public root: RootStore,
    private router: Router
  ) {
    this.root.authService = this;
    window['auth']        = this;
  }


  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('userInfo');
    return !!(userData && JSON.parse(userData));
  }


  public async logout() {
    await this.root.authAdapter.logout();
    localStorage.clear();
    this.root.lis.currentUser = null;
    await this.router.navigate(['login']);
  }

  public setUserInfo(user) {
    this.root.lis.currentUser = user.user;
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public async validate(username, password) {
    try {
      return await this.root.authAdapter.validate(username, password);
    } catch (e) {
      this.root.lis.wrongDetails = true;
      console.error(e);
    }
  }

  public async signup(username, password, email) {
    try {
      await this.root.authAdapter.signup(username, password, email);
      this.root.sus.inUse = false;
    } catch (e) {
      this.root.sus.inUse = true;
    }
  }

}
