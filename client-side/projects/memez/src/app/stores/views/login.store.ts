import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';
import {IUser} from '../../../../../../../sheard/interfaces/IUser';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginStore {
  @observable currentUser: IUser
  @observable wrongDetails: boolean = false


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.lis = this;
    window['lis'] = this;
  }


  @action
  async login(username, password) {
    this.root.authService.validate(username, password)
      .then((response) => {
        this.root.authService.setUserInfo({'user': response['user']});
        this.router.navigate(['feed']);
      })
    return
  }



  async signOutNavigation() {
    this.currentUser = null;
    await this.router.navigateByUrl(``)
  }

  async signUpNavigation() {
    await this.router.navigateByUrl(`signup`)
  }


}
