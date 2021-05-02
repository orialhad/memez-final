//region Imports
import {Injectable}         from '@angular/core';
import {RootStore}          from '../root.store';
import {action, observable} from 'mobx-angular';
import {IUser}              from '../../../../../../../sheard/interfaces/IUser';
import {Router}             from '@angular/router';
//endregion


@Injectable({
  providedIn: 'root'
})
export class LoginStore {
  @observable currentUser: IUser;
  @observable wrongDetails: boolean = false;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.lis = this;
    window['lis'] = this;
  }


  @action
  async login(username, password) {
    if (username && password) {
      let user_case = username.toLowerCase();
      this.root.authService.validate(user_case, password)
          .then((response) => {
            this.currentUser = response['user'];
            this.root.authService.setUserInfo({'user': response['user']});
            this.router.navigate(['feed']);
          });
      return;
    } else {
      console.log('no user name entered');
    }
  }

  async signUpNavigation() {
    await this.router.navigateByUrl(`signup`);
  }


}
