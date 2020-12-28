import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, computed, observable} from 'mobx-angular';
import {ILike} from '../../types/interfaces/ILike';
import {IPost} from '../../types/interfaces/IPost';
import {autorun, toJS} from 'mobx';
import {IUser} from '../../types/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class LikeStore {
  @observable likes: ILike[] = [];

  constructor(
    public root: RootStore
  ) {
    this.root.lks = this;
    window['lks'] = this;
    autorun(() => {
    });
  }

  @action
  async getLikes() {
    return this.likes = await this.root.likeAdapter.getLikes();
  }

  @action
  async createLike(post: IPost) {
    let likeInput = {
      userLiked: this.root.lis.currentUser,
      postLiked: post
    };
    await this.root.likeAdapter.createLike(likeInput);
  }

  @action
  async unLike(like_id: string) {
    await this.root.likeAdapter.unLike(like_id);
  }

  @action
  async handleLike(post: IPost) {
    const current = this.root.lis.currentUser;
    const alreadyLiked = await post.likes.find(like => like.userLiked._id === current._id);
    if (alreadyLiked) {
      await this.unLike(alreadyLiked._id);
    } else {
      await this.createLike(post);
    }
    await this.root.ps.getAllPosts();
  }
}

