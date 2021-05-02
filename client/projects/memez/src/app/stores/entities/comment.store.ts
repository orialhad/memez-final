//region Imports
import {Injectable}              from '@angular/core';
import {RootStore}               from '../root.store';
import {action, observable}      from 'mobx-angular';
import {IComment}                from '../../../../../../../sheard/interfaces/IComment';
import * as dayjs                from 'dayjs';
import {CommentsDialogComponent} from '../../reusable-components/comments-dialog/comments-dialog.component';
import {MatDialog}               from '@angular/material/dialog';
//endregion

@Injectable({
  providedIn: 'root'
})
export class CommentStore {
  @observable comment: string;
  @observable comment_id: string;


  constructor(
    public root: RootStore,
    public dialog: MatDialog
  ) {
    this.root.cms = this;
    window['cms'] = this;
  }


  @action
  async createComment(post_id, content) {
    const commentInput: IComment = {
      userCommentedId: this.root.lis.currentUser._id,
      postCommentedId: post_id,
      content        : content,
      date           : dayjs().format('DD.MM.YY'),
      time           : dayjs().format('HH:mm:ss')
    };
    await this.root.commentAdapter.createComment(commentInput);
    setTimeout(() => {
      this.openCommentsDialog(post_id);
    }, 300);
  }

  @action
  async deleteComment(post_id, commentId: string) {
    await this.root.commentAdapter.deleteComment(commentId);
    setTimeout(() => {
      this.openCommentsDialog(post_id);
    }, 300);
  }

  @action
  async openCommentsDialog(post_id) {
    let dialogRef                           = this.dialog.open(CommentsDialogComponent, {
      width : '700px',
      height: '700px'
    });
    dialogRef.componentInstance.post        = await this.root.ps.getPostById(post_id);
    dialogRef.componentInstance.currentUser = this.root.lis.currentUser;
    dialogRef.componentInstance.newComment.subscribe(async () => {
        this.comment = dialogRef.componentInstance.comment;
        await this.root.cms.createComment(post_id, this.comment);
        dialogRef.close();
      }
    );
    dialogRef.componentInstance.deleteComment.subscribe(async () => {
      this.comment_id = dialogRef.componentInstance.comment_id;
      await this.root.cms.deleteComment(post_id, this.comment_id);
      dialogRef.close();
    });
    await dialogRef.afterClosed().toPromise();
  }
}
