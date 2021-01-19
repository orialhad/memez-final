import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {ILike} from '../../../../../../sheard/interfaces/ILike';
import {BaseSocketAdapter} from './base-socket.adapter';
import {IComment} from "../../../../../../sheard/interfaces/IComment";

@Injectable({
  providedIn: 'root'
})
export class CommentAdapter extends BaseSocketAdapter {

  constructor() {
    super();
  }


  async createComment(comment: IComment): Promise<IComment> {
    return this.request(`createComment` ,comment);
  }

  async deleteComment(commentId: string): Promise<ILike[]> {
    return await this.request('deleteComment', commentId);
  }
}


