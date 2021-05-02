//region Imports
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPost}                                          from '../../../../../../../sheard/interfaces/IPost';
import {IUser}                                          from '../../../../../../../sheard/interfaces/IUser';
//endregion

@Component({
  selector   : 'mem-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls  : ['./comments-dialog.component.css']
})
export class CommentsDialogComponent implements OnInit {

  @Input() post: IPost;
  @Output() newComment    = new EventEmitter();
  @Output() deleteComment = new EventEmitter();

  comment: string;
  comment_id: string;

  currentUser: IUser = undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  onComment(content) {
    this.comment = content;
    this.newComment.emit(this.comment);
  }

  onDelete(comment_id) {
    this.comment_id = comment_id;
    this.deleteComment.emit(this.comment_id);
  }


}
