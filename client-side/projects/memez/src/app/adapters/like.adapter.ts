import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {ILike} from '../../../../../../sheard/interfaces/ILike';
import {BaseSocketAdapter} from './base-socket.adapter';

@Injectable({
  providedIn: 'root'
})
export class LikeAdapter extends BaseSocketAdapter {

  constructor() {
    super();
  }

  async createLike(likeIds): Promise<ILike> {
    return this.request('createLike', likeIds);
  }

  async unLike(like_id: string): Promise<ILike> {
    return this.request(`unlike` ,like_id);
  }

  async getLikes(): Promise<ILike[]> {
    return await this.request('getLikes');
  }
}


