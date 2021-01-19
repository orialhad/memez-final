import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../../../../../../sheard/interfaces/IComment";
import {IPost} from "../../../../../../../sheard/interfaces/IPost";
import {observable} from "mobx-angular";

@Component({
  selector: 'mem-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.css']
})
export class CommentsDialogComponent implements OnInit {

  @Input() post : IPost
  @Output() newComment = new EventEmitter();

  comment: string

  constructor() { }

  ngOnInit(): void {
  }

  onComment(content){
    this.comment = content
    this.newComment.emit(this.comment);
  }

}
