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
  async getAllPosts(): Promise<IPost[]> {
    this.posts = await this.root.postAdapter.getAllPosts();
    return this.posts;

  }


  @action
  async createPost(content: string) {
    let newPost = {
      content : content,
      postedBy: this.root.lis.currentUser,
      date    : dayjs().format('DD.MM.YY'),
      time    : dayjs().format('hh:mm:ss'),
      likes   : [],
      image   : (this.root.ups.newFileName !== undefined) ? BaseUrl+'/image/'+ this.root.ups.newFileName : ""
    };
    await this.root.postAdapter.createPost(newPost);
    this.root.ups.newFileName = undefined
    await this.getAllPosts();
  }

  @action
  async deletePost(post: IPost) {
    if (post.postedBy._id === this.root.lis.currentUser._id) {
      await this.root.postAdapter.deletePost(post._id);
      await this.getAllPosts();
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
