import {Injectable} from '@angular/core';
import {RootStore}  from '../root.store';
import {Router}     from '@angular/router';
import {autorun}    from 'mobx';

@Injectable({
  providedIn: 'root'
})
export class LayoutStore {

  constructor(
    public root: RootStore,
    private router: Router
  ) {
    this.root.lys = this;
    window['ly']  = this;
    autorun(() => {

    });
  }

  userProfileNavigation() {
    this.router.navigateByUrl(`profile`).then();
  }

  homeNavigation() {
    this.router.navigateByUrl(`feed`).then();
  }
}
