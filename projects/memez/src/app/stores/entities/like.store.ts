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
    await this.pushLikeToPost(post);//ui

  }
  @action
  async unLike(user: IUser) {
    await this.root.likeAdapter.unLike(user._id);

  }


  @action
  async handleLike(post: IPost) {
    const current = this.root.lis.currentUser;
    const postAlreadyLiked = post.likes.find(like => like.userLiked._id === current._id)
    if (postAlreadyLiked) {
        alert(`You already liked this please dont try again `)
      //   await this.unLike(current)
      } else {
      await this.createLike(post);
    }
  }

  //ui
  @action
   pushLikeToPost(post: IPost) {
    let like_arr = this.likes.find(e => e.postLiked._id === post._id)
    post.likes.push(like_arr)

  }



}

