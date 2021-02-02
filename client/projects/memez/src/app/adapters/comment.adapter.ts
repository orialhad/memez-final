import {Injectable}        from '@angular/core';
import {BaseSocketAdapter} from './base-socket.adapter';
import {IComment}          from '../../../../../../sheard/interfaces/IComment';

@Injectable({
  providedIn: 'root'
})
export class CommentAdapter extends BaseSocketAdapter {

  constructor() {
    super();
  }


  async createComment(comment: IComment): Promise<IComment> {
    return this.request(`createComment`, comment);
  }

  async deleteComment(commentId: string): Promise<void> {
    return await this.request('deleteComment', commentId);
  }
}


