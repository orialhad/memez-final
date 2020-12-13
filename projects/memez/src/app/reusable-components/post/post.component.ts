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
  @Output() PostToDelete = new EventEmitter();

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();




  constructor() { }

  ngOnInit(): void {
  }

  onPostLike(post:IPost){
    this.postLiked.emit(post);
  }

  deletePost(post:IPost){
    this.PostToDelete.emit(post);
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }




}
