import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {ILike} from '../../../../../../sheard/interfaces/ILike';

@Injectable({
  providedIn: 'root'
})
export class LikeAdapter extends BaseAjaxAdapter {

  constructor(http: HttpClient) {
    super(http);
  }

  async createLike(likeIds): Promise<ILike> {
    return this.post('likes', likeIds);
  }

  async unLike(like_id: string): Promise<ILike> {
    return this.delete(`likes/${like_id}`);
  }

  async getLikes(): Promise<ILike[]> {
    return await this.get('likes');
  }
}


