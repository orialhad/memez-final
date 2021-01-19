import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, computed, observable} from 'mobx-angular';
import {IPost} from '../../../../../../../sheard/interfaces/IPost';
import {BaseUrl} from '../../config/config';
import * as dayjs from 'dayjs';
import {MatDialog} from '@angular/material/dialog';
import {UploadComponent} from '../../reusable-components/upload/upload.component';
import {CommentsDialogComponent} from "../../reusable-components/comments-dialog/comments-dialog.component";


@Injectable({
  providedIn: 'root'
})
export class PostStore {
  @observable posts: IPost[] = [];
  @observable searchTerm: string;
  @observable newFile: File;
  @observable new_post: string = '';



  constructor(
    public root: RootStore,
    public dialog: MatDialog
  ) {
    this.root.ps = this;
    window['ps'] = this;
    this.listenToPostsUpdate();
  }


  @action
  async getPosts() {
    this.posts = await this.root.postAdapter.getPosts();
  }

  @action getPostById(post_id: string) {
    return this.posts.find(post => post_id === post._id)
  }


  @action
  async createPost(content: string) {
    let newPost = {
      content    : content,
      postedBy_id: this.root.lis.currentUser._id,
      date       : dayjs().format('DD.MM.YY'),
      time       : dayjs().format('hh:mm:ss'),
      likes      : [],
      image      : (this.root.ups.newFileName !== undefined) ? BaseUrl + '/image/' + this.root.ups.newFileName : ''
    };
    await this.root.postAdapter.createPost(newPost);
    this.root.ups.newFileName = undefined;
    this.new_post = '';
  }

  @action
  async deletePost(post: IPost) {
    if (post.postedBy._id === this.root.lis.currentUser._id) {
      await this.root.postAdapter.deletePost(post._id);
    } else {
      alert(`WHAT ARE YOU DOING !!!!! YOU CANT DO THAT`);
    }
  }

  @computed get filteredPosts() {
    return this.searchTerm ?
      this.reversedPosts.filter((post) => {
        return post.content?.includes(this.searchTerm) || post.postedBy.username.includes(this.searchTerm);
      }) : this.reversedPosts;
  }

  @action
  onSearch(value: string) {
    setTimeout(() => {
      this.searchTerm = value;
    }, 1000);

  }


  @computed get reversedPosts() {
    return this.posts
      .slice()
      .reverse();
  }

  @action async openUploadDialogPosting() {
    let dialogRef = this.dialog.open(UploadComponent, {
      width : '800px',
      height: '900px'
    })
    dialogRef.componentInstance.uploadedFiles.subscribe(() => {
      this.newFile = dialogRef.componentInstance.resultImage
      this.root.ups.onUpload(this.newFile).then()
    })
    await dialogRef.afterClosed().toPromise()

  }




  listenToPostsUpdate() {
    this.root.socketAdapter.listenToEvent('postsUpdate', posts => {
      this.posts = posts;
    });
  }

}
