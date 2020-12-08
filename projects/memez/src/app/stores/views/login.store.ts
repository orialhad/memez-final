import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';
import {IUser} from '../../types/interfaces/IUser';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {MOCK_USERS} from '../../mocks/MOCK_USERS';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginStore {
  @observable currentUser: IUser;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.lis = this;
    window['lis'] = this;
  }


  @action userLogin(name: string) {
    if(!name){
      return alert(`Enter a name`)
    }
    else {

    this.router.navigateByUrl(`feed`).then();
  }}


  @action loginVerification(name: string) {
    const loginUser = this.root.us.users.find(user => user.name.toLowerCase() === name.toLowerCase())
    if (!loginUser) {
      alert('no such user ')
    } else {
      return this.currentUser === loginUser;
    }
  }

  @action loginHandler(name: string){
    this.loginVerification(name)
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
