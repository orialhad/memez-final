//region Imports
import {Injectable}        from '@angular/core';
import {BaseSocketAdapter} from './base-socket.adapter';
import {ILike}             from '../../../../../../sheard/interfaces/ILike';
//endregion

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
    return this.request(`unlike`, like_id);
  }

}


