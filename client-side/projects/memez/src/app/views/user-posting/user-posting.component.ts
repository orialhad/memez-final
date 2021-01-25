import {Component, OnInit}       from '@angular/core';
import {PostStore}               from '../../stores/entities/post.store';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector   : 'mem-user-posting',
  templateUrl: './user-posting.component.html',
  styleUrls  : ['./user-posting.component.css'],

})
export class UserPostingComponent implements OnInit {


  constructor(
    public ps: PostStore
  ) {
  }

  ngOnInit(): void {
  }


}
