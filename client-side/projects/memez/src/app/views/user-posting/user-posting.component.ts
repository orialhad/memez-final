import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PostStore}                               from '../../stores/entities/post.store';

@Component({
  selector   : 'mem-user-posting',
  templateUrl: './user-posting.component.html',
  styleUrls  : ['./user-posting.component.css'],

})
export class UserPostingComponent implements OnInit {
  // @Output() newPost = new EventEmitter();



  constructor(
    public ps: PostStore
  ) {

  }

  ngOnInit(): void {
  }

  // userNewPost(val) {
  //   this.newPost.emit(val);
  //
  //
  // }

}
