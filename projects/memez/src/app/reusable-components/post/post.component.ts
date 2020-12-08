import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPost} from '../../types/interfaces/IPost';

@Component({
  selector: 'mem-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: IPost
  @Output() postLiked = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  onPostLike(post:IPost){
    this.postLiked.emit(post);
  }



}
