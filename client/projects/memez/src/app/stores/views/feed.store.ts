import {Injectable} from '@angular/core';
import {RootStore}  from '../root.store';
import {IPost}      from '../../../../../../../sheard/interfaces/IPost';
import {action}     from 'mobx-angular';
import {MatDialog}  from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class FeedStore {

  constructor(
    public root: RootStore,
  ) {
    this.root.fs = this;
    window['fs'] = this;
  }

  @action verifyUserLike(post: IPost): boolean {
    const current = this.root.lis.currentUser;
    if (current) {
      return post.likes.some(like => like.userLiked === current._id);
    }
  }
}


