import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, computed, observable} from 'mobx-angular';
import {IPost} from '../../types/interfaces/IPost';
import {autorun} from 'mobx';
import {ILike} from '../../types/interfaces/ILike';
import dayjs = require('dayjs');

@Injectable({
  providedIn: 'root'
})
export class PostStore {
  @observable posts: IPost[] = [];

  // @observable fileToUpload: File = null;

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

  @action getPostsWithLikes(post: IPost): IPost {
    const postLikes = this.root.lks.likes.find(e => e.postLiked._id === post._id);
    console.log(postLikes);
    post.likes.push(postLikes);
    return post;
  }


  @action
  async createPost(content: string) {
    let newPost = {
      content: content,
      postedBy: this.root.lis.currentUser,
      date: dayjs().format('DD.MM.YY'),
      time: dayjs().format('hh.mm.ss'),
      likes: []
    };
    await this.root.postAdapter.createPost(newPost);
    this.posts.push(newPost);
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
