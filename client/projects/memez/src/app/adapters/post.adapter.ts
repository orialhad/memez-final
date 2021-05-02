//region Imports
import {Injectable}        from '@angular/core';
import {IPost}             from '../../../../../../sheard/interfaces/IPost';
import {BaseSocketAdapter} from './base-socket.adapter';
//endregion

@Injectable({
  providedIn: 'root'
})
export class PostAdapter extends BaseSocketAdapter {

  constructor() {
    super();
  }

  async getPosts(): Promise<IPost[]> {
    return this.request<IPost[]>('getPosts');
  }

  async createPost(postContent): Promise<IPost> {
    return this.request('createPost', postContent);

  }

  async deletePost(post_id: string): Promise<IPost> {
    return this.request('deletePost', {id: post_id});
  }


}
