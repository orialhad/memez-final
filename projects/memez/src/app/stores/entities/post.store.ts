import { Injectable } from '@angular/core';
import {RootStore} from '../root.store';
import {action, computed, observable} from 'mobx-angular';
import {IPost} from '../../types/interfaces/IPost';
import {MOCK_POSTS} from '../../mocks/MOCK_POSTS';
import {MOCK_USERS} from '../../mocks/MOCK_USERS';
import {timestamp} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import {autorun} from 'mobx';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostStore {
  @observable posts: IPost[] = []
  // @observable fileToUpload: File = null;

  constructor(
    public root: RootStore
  ) {
    this.root.ps = this;
    window['ps'] = this;
    autorun(() => {

    })
  }


  @action async getAllPosts(): Promise<IPost[]> {
    this.posts = await this.root.postAdapter.getAllPosts();
    return this.posts

  }

  @action async createPost(content : string) {
    let newPost = {
      content: content,
      user_id: this.root.lis.currentUser,
    }
    await this.root.postAdapter.createPost(newPost)
    await this.getAllPosts()
  }

  @action async deletePost(post: IPost){
    if(post.postedBy._id === this.root.lis.currentUser._id){
      await this.root.postAdapter.deletePost(post._id);
      await this.getAllPosts()
    }else {
      alert(`WHAT ARE YOU DOING !!!!! YOU CANT DO THAT`)
    }
  }


  @computed get reversedPosts() {
    return this.posts
      .slice()
      .reverse()
  }



}
