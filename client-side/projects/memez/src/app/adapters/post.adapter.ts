import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {IPost} from '../../../../../../sheard/interfaces/IPost';
import {BaseSocketAdapter} from './base-socket.adapter';

@Injectable({
  providedIn: 'root'
})
export class PostAdapter extends BaseSocketAdapter {

  constructor(
  ) {
    super();
  }


  async getPosts(): Promise<IPost[]> {
    return this.request<IPost[]>('getPosts');
  }
  async createPost(postContent): Promise<IPost> {
    return this.request('createPost', postContent);

  }
  async deletePost(post_id: string): Promise<IPost> {
    return this.request('deletePost', {id: post_id})
  }

  // async getPostByID(post_id: string) {
  //   return this.request('getPost', {id: post_id})
  //
  // }

}
