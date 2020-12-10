import { Injectable } from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';
import {IUser} from '../../types/interfaces/IUser';


@Injectable({
  providedIn: 'root'
})
export class UserStore {
  @observable users: IUser[] = [];

  constructor(
    public root : RootStore
  ) {
    this.root.us = this;
    window['us'] = this;
  }


  @action  async getUsers(){
    this.users = await this.root.userAdapter.getUsers();
    return this.users
  }

  @action getCurrentUserPosts(){
    const current = this.root.lis.currentUser
    const currentPosts =  this.root.ps.posts.filter(ele => ele.postedBy._id === current._id)
    return currentPosts.reverse()
  }

}
