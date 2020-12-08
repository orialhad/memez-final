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
export class SignupStore {
  @observable newUser: string;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.sus = this;
    window['lis'] = this;
  }

  @action async signUpUser(user){
    const input = {
      name: this.newUser.toLowerCase()
    }
    const exist = this.root.us.users.some(user => user.name.toLowerCase() === input.name)
    if(exist){
     alert(`user already exist - choose different name`)
    }else{
      await this.root.userAdapter.createNewUser(input)
      await this.router.navigateByUrl(`login`)

    }
  }





}
