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
  @observable user_name: string;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.lis = this;
    window['lis'] = this;
  }


  // @action userLogin(name: string) {
  //   if(!name){
  //     return alert(`Enter a name`)
  //   }
  //   else {this.router.navigateByUrl(`feed`).then();
  // }}


  @action async loginVerification(name: string) {

    await this.root.us.getUsers()
    const loginUser = this.root.us.users.find(user => user.name.toLowerCase() === name.toLowerCase())
    if (!loginUser) {
    alert('no such user ')
    }
    this.currentUser = loginUser;
  }


  @action async loginHandler(name: string){
    await this.loginVerification(name)
    if(this.currentUser){
      this.router.navigateByUrl(`feed`).then();
    }
  }


  signOutNavigation() {
    this.currentUser = null;
    this.router.navigateByUrl(``).then();
  }



  signUpNavigation() {
    this.router.navigateByUrl(`signup`).then();
  }


}
