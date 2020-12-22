import { Injectable } from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {IPost} from '../types/interfaces/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostAdapter extends BaseAjaxAdapter{

  constructor(
    http: HttpClient
  ) {
    super(http);
  }
  async getAllPosts(): Promise<IPost[]> {
    return this.request<IPost[]>('posts');
  }

  async createPost(postContent): Promise<IPost> {
    return this.post('posts', postContent)

  }
  // async updatePost(postContent): Promise<IPost> {
  //   return this.post('posts', postContent)
  //
  // }

  async deletePost(post_id: string): Promise<IPost> {
    return this.delete(`posts/${post_id}`)
  }

  async getPostByID(post_id: string) {
    return await this.request(`posts/${post_id} `)

  }

}
