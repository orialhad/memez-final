import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import {IPost} from '../../../../../../../sheard/interfaces/IPost';
import {IUser} from '../../../../../../../sheard/interfaces/IUser';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpEvent} from '@angular/common/http';




@Component({
  selector   : 'mem-post',
  templateUrl: './post.component.html',
  styleUrls  : ['./post.component.css']
})




export class PostComponent implements OnInit {
  @ViewChild("myModal") myModal: ElementRef;

  @Input() post: IPost;
  @Input() currentUser :IUser;
  @Output() postLiked = new EventEmitter();
  @Output() PostToDelete = new EventEmitter();

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  status: boolean


  constructor() {
  }

  ngOnInit(): void {
  }

  onPostLike(post: IPost) {
    this.postLiked.emit(post);
  }

  deletePost(post: IPost) {
    this.PostToDelete.emit(post);
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  openModal(){
    this.status = true
  }
  closeModal_btn(){
    this.status = false
  }
  closeModal(event) {
    window.onclick = (event) => {
      this.status = false
    }
  }
}
