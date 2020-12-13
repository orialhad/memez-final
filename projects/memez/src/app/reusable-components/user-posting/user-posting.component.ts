import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {autorun} from 'mobx';

@Component({
  selector: 'mem-user-posting',
  templateUrl: './user-posting.component.html',
  styleUrls: ['./user-posting.component.css'],

})
export class UserPostingComponent implements OnInit {
  @Output() newPost = new EventEmitter()
  // @Output() uploadedFile = new EventEmitter()



  constructor() {

  }

  ngOnInit(): void {
  }



  userNewPost(val){
    this.newPost.emit(val);

  }

}
