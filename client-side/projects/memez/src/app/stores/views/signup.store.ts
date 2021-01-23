import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SignupStore {
  @observable newUser: string = ``;


  constructor(
    public root: RootStore,
    private router: Router,
  ) {
    this.root.sus = this;
    window['sus'] = this;
  }

  @action async signUpUser(username: string,password:string,password2:string, email){
    username = username.toLowerCase()
    if(password === password2) {
       await this.root.authService.signup(username, password, email)
        await this.root.lis.login(username,password)
      console.log("User Created")
    }else {
      console.log("Password doesn't match")
    }
  }

  @action async loginNavigation() {
    await this.router.navigateByUrl(``)
  }

}
