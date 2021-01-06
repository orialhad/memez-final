import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, computed, observable} from 'mobx-angular';
import {IPost} from '../../../../../../../sheard/interfaces/IPost';
import {autorun} from 'mobx';
import {ILike} from '../../../../../../../sheard/interfaces/ILike';
import dayjs = require('dayjs');
import {BaseUrl} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PostStore {
  @observable posts: IPost[] = [];


  constructor(
    public root: RootStore
  ) {
    this.root.ps = this;
    window['ps'] = this;
    autorun(() => {

    });
  }


  @action
  async getPosts(){
    this.posts = await this.root.postAdapter.getPosts();
  }


  @action
  async createPost(content: string) {
    let newPost = {
      content : content,
      postedBy_id: this.root.lis.currentUser._id,
      date    : dayjs().format('DD.MM.YY'),
      time    : dayjs().format('hh:mm:ss'),
      likes   : [],
      image   : (this.root.ups.newFileName !== undefined) ? BaseUrl+'/image/'+ this.root.ups.newFileName : ""
    };
    await this.root.postAdapter.createPost(newPost);
    this.root.ups.newFileName = undefined
    await this.getPosts();
  }

  @action
  async deletePost(post: IPost) {
    if (post.postedBy._id === this.root.lis.currentUser._id) {
      await this.root.postAdapter.deletePost(post._id);
      await this.getPosts();
    } else {
      alert(`WHAT ARE YOU DOING !!!!! YOU CANT DO THAT`);
    }
  }


  @computed get reversedPosts() {
    return this.posts
               .slice()
               .reverse();
  }

}
