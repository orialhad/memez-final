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
  @observable username: string;
  @observable password: string;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.lis = this;
    window['lis'] = this;
  }


  @action
  async loginVerification(username) {
    this.root.authService.validate(this.username, this.password)
      .then((response) => {
        this.root.authService.setUserInfo({'user': response['user']});
        this.router.navigate(['feed']);
      })
    return
  }

  // await this.root.us.getUsers()
  // this.root.us.users.find(user => user?.username?.toLowerCase() === username?.toLowerCase())


  @action
  async loginHandler(username) {
    await this.root.us.getUsers()
    // this.currentUser =  JSON.parse(localStorage.getItem('userInfo')).user
    await this.loginVerification(username)



  }



  async signOutNavigation() {
    this.currentUser = null;
    await this.router.navigateByUrl(``)
  }


  async signUpNavigation() {
    await this.router.navigateByUrl(`signup`)
  }


}
