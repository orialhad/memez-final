import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';
import {IUser} from '../../types/interfaces/IUser';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class LoginStore {
  @observable currentUser: IUser
  @observable userName: string;
  @observable password : string;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.lis = this;
    window['lis'] = this;
  }



  @action async loginVerification() {
    this.root.authService.validate(this.userName, this.password)
      .then((response) => {
        this.root.authService.setUserInfo({'user': response['user']});
        this.router.navigate(['feed']);

      })
    return
  }

    // await this.root.us.getUsers()
    // const loginUser = this.root.us.users.find(user => user.userName.toLowerCase() === userName.toLowerCase())
    // if (!loginUser) {
    //   alert('no such user ')
    // }
    // this.currentUser = loginUser;



  @action async loginHandler(userName){
    await this.loginVerification()
      this.currentUser = this.root.us.users.find(user => user.userName.toLowerCase() === userName.toLowerCase())
    }
    // if(this.currentUser){
      // this.router.navigateByUrl(`feed`).then();
    // }



  signOutNavigation() {
    this.currentUser = null;
    this.router.navigateByUrl(``).then();
  }



  signUpNavigation() {
    this.router.navigateByUrl(`signup`).then();
  }


}
