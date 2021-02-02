import {Injectable}         from '@angular/core';
import {RootStore}          from '../root.store';
import {action, observable} from 'mobx-angular';
import {Router}             from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SignupStore {
  @observable newUser: string = ``;
  @observable inUse: boolean  = false;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.sus = this;
    window['sus'] = this;
  }

  @action
  async signUpUser(username: string, password: string, password2: string, email: string) {
    const username_low = username.toLowerCase();
    if (password === password2) {
      await this.root.authService.signup(username_low, password, email);
      if (!this.inUse) {
        await this.root.lis.login(username_low, password);
      }
    } else {
      console.log('Password doesn\'t match');
    }
  }

  @action
  async loginNavigation() {
    await this.router.navigateByUrl(``);
  }


}
