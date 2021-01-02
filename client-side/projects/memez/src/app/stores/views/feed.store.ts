import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {IPost} from '../../../../../../../sheard/interfaces/IPost';
import {autorun} from 'mobx';
import {action, computed, observable} from 'mobx-angular';
import {MatDialog} from '@angular/material/dialog';
import {UploadComponent} from '../../reusable-components/upload/upload.component';
import {uploadFiles} from '../../../../../../../server-side/config/upload_storage';

@Injectable({
  providedIn: 'root'
})
export class FeedStore {

  @observable newFile : File;

  constructor(
    public root: RootStore,
    public dialog: MatDialog
  ) {
    this.root.fs = this;
    window['fs'] = this;

  }


  @action verifyUserLike(post: IPost): boolean {
    const current = this.root.lis.currentUser;
    if (current) {
      return post.likes.some(like => like.userLiked._id === current._id);
    }
  }



  @action  openUploadDialog() {
    let dialogRef = this.dialog.open(UploadComponent,{
      width: '400px',
      height: '400px'
    });
    dialogRef.componentInstance.uploadedFiles.subscribe(()=>{
      this.newFile = dialogRef.componentInstance.newFile
      this.root.ups.onUpload(this.newFile).then()
    })
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}


