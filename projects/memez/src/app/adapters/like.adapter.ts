import { Injectable } from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {ILike} from '../types/interfaces/ILike';

@Injectable({
  providedIn: 'root'
})
export class LikeAdapter extends BaseAjaxAdapter{

  constructor(http: HttpClient) {
    super(http)
  }
  async getPostFromLike(post_id: string): Promise<ILike[]> {
    return this.request<ILike[]>(`posts/likes/${post_id} `);
  }

  async createLike(likeIds): Promise<ILike> {
    return this.post('likes', likeIds)
  }

  async removeLike(likeId: string): Promise<ILike> {
    return this.delete(`likes/${likeId}`)
  }

  async getLikes():Promise<ILike[]> {
    return await this.request('likes');
  }
}


