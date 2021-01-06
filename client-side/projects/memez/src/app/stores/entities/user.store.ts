import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, computed, observable} from 'mobx-angular';
import {IUser} from '../../../../../../../sheard/interfaces/IUser';
import {autorun} from 'mobx';
import {BaseUrl} from '../../config/config';
import {UploadComponent} from '../../reusable-components/upload/upload.component';
import {MatDialog} from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class UserStore {
  @observable users: IUser[] = [];

  @observable userProfileImage: File;

  constructor(
    public root: RootStore,
    public dialog: MatDialog
  ) {
    this.root.us = this;
    window['us'] = this;
    autorun(() => {

    });
  }


  @action
  async getUsers() {
    this.users = await this.root.userAdapter.getUsers();
    return this.users;
  }

  @action
  async editProfilePic(user: IUser, filename: string) {
    let
      id     = user._id,
      avatar = BaseUrl + '/image/' + filename;
    await this.root.userAdapter.editProfilePic(id, avatar);
    this.updateLocaleStorage(avatar);
    this.root.lis.currentUser.avatar = avatar;
    this.root.ups.newFileName = undefined;
    await this.root.ps.getPosts()
  }

  @action updateLocaleStorage(avatar) {
    const currentLocalStorage = JSON.parse(localStorage.getItem('userInfo')).user;
    const updatedLocalStorage = JSON.stringify({user: {...currentLocalStorage, avatar: avatar}});
    localStorage.setItem('userInfo', updatedLocalStorage);
  }


  @action getCurrentUser() {
    this.root.lis.currentUser = JSON.parse(localStorage.getItem('userInfo')).user;
  }

  @computed get currentUserPosts() {
    const current = this.root.lis.currentUser;
    if (current) {
      const currentPosts = this.root.ps.posts.filter(ele => ele.postedBy._id === current._id);
      return currentPosts.reverse();
    }
  }

  @action openUploadDialogProfile() {
    let dialogRef1 = this.dialog.open(UploadComponent, {
      width : '800px',
      height: '875px'
    });
    dialogRef1.componentInstance.uploadedFiles.subscribe(() => {
      this.userProfileImage = dialogRef1.componentInstance.resultImage;
      this.root.ups.onUpload(this.userProfileImage).then();
    });
    dialogRef1.afterClosed().subscribe(() => {
    });
  }

}
