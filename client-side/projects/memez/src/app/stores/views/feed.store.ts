import { Injectable } from '@angular/core';
import {RootStore} from '../root.store';
import {IPost} from '../../types/interfaces/IPost';

@Injectable({
  providedIn: 'root'
})
export class FeedStore {

  constructor(
    public root : RootStore
  ) {
    this.root.fs = this;
    window['fs'] = this;
  }


 verifyUserLike(post: IPost):boolean {
   const current = this.root.lis.currentUser;
   if (current) {
     return post.likes.some(like => like.userLiked._id === current._id)
   }
 }
}

