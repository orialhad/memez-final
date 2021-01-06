import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {IPost} from '../../../../../../../sheard/interfaces/IPost';
import {action, observable} from 'mobx-angular';
import {MatDialog} from '@angular/material/dialog';
import {UploadComponent} from '../../reusable-components/upload/upload.component';

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
      return post.likes.some(like => like.userLiked._id === current._id)
    }
  }



  @action  openUploadDialogFeed() {
    let dialogRef = this.dialog.open(UploadComponent,{
      width: '800px',
      height: '900px'
    })

    dialogRef.componentInstance.uploadedFiles.subscribe(()=>{
      this.newFile = dialogRef.componentInstance.resultImage
      this.root.ups.onUpload(this.newFile).then()
    })
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}


