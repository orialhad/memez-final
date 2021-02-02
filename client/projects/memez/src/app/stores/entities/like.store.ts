import {Injectable} from '@angular/core';
import {RootStore}  from '../root.store';
import {action}     from 'mobx-angular';
import {IPost}      from '../../../../../../../sheard/interfaces/IPost';
import {autorun}    from 'mobx';

@Injectable({
  providedIn: 'root'
})
export class LikeStore {


  constructor(
    public root: RootStore
  ) {
    this.root.lks = this;
    window['lks'] = this;
  }


  @action
  async createLike(post: IPost) {
    let likeInput = {
      userLiked: this.root.lis.currentUser._id.toString(),
      postLiked: post._id.toString()
    };
    await this.root.likeAdapter.createLike(likeInput);
  }

  @action
  async unLike(like_id: string) {
    await this.root.likeAdapter.unLike(like_id);
  }

  @action
  async handleLike(post: IPost) {
    const
      current      = this.root.lis.currentUser,
      alreadyLiked = await post.likes.find(like => like.userLiked === current._id);
    if (alreadyLiked) {
      await this.unLike(alreadyLiked._id);
    } else {
      await this.createLike(post);
    }
    // await this.root.ps.getPosts();
  }
}

