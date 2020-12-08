import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';
import {ILike} from '../../types/interfaces/ILike';
import {MOCK_LIKES} from '../../mocks/MOCK_LIKES';
import {IPost} from '../../types/interfaces/IPost';
import {timestamp} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import {autorun, toJS} from 'mobx';

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
      let i = 0;
      console.log(`like store : ${toJS(this.likes.map(like => i++))}`);
    });
  }


  @action
  async getAllLikes() {
    return this.likes = await this.root.likeAdapter.getLikes()

  }
  @action
  async getPostFromLike(post: IPost){
    return post.likes  = await this.root.likeAdapter.getPostFromLike(post._id)
  }

  @action
  async createLike(post: IPost) {
    let likeInput = {
      user_id: this.root.lis.currentUser._id,
      post_id: post._id
    };
    return await this.root.likeAdapter.createLike(likeInput);
  }
  @action
  async removeLike(like_id: string){
    await this.root.likeAdapter.removeLike(like_id)
  }



  @action
  async handleLike(post: IPost) {
    const postAlreadyLiked: ILike = post.likes.find(like => like._id === this.root.lis.currentUser._id)
    if (postAlreadyLiked) {
      await this.removeLike(postAlreadyLiked._id)
      }else {
      await this.createLike(post)
    }
    await this.root.ps.getAllPosts()
  }

}


