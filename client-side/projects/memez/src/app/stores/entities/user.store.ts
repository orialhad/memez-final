import {Injectable}                   from '@angular/core';
import {RootStore}                    from '../root.store';
import {action, computed, observable} from 'mobx-angular';
import {IUser}                        from '../../../../../../../sheard/interfaces/IUser';
import {autorun}                      from 'mobx';
import {BaseUrl}                      from '../../config/config';
import {UploadComponent}              from '../../reusable-components/upload/upload.component';
import {MatDialog}                    from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class UserStore {
  @observable users: IUser[] = [];
  @observable userProfileImage: File;

  @observable isEditEmail: boolean = false;

  constructor(
    public root: RootStore,
    public dialog: MatDialog
  ) {
    this.root.us = this;
    window['us'] = this;
    this.listenToUserUpdate();
    this.listenToErrors();
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
    this.root.ups.newFileName = undefined;
  }


  @action
  async editEmail(userId: string, email: string) {
    this.isEditEmail = false;
    return await this.root.userAdapter.editEmail(userId, email);
  }


  // @action updateLocaleStorage(avatar) {
  //   const currentLocalStorage = JSON.parse(localStorage.getItem('userInfo')).user;
  //   const updatedLocalStorage = JSON.stringify({user: {...currentLocalStorage, avatar: avatar}});
  //   localStorage.setItem('userInfo', updatedLocalStorage);
  // }


  @action
  async getCurrentUser() {
    const id                  = JSON.parse(localStorage.getItem('userInfo')).user._id;
    this.root.lis.currentUser = await this.root.userAdapter.getUserById(id);
  }

  @computed get currentUserPosts() {
    const current = this.root.lis.currentUser;
    if (current) {
      const currentPosts = this.root.ps.posts.filter(post => post.postedBy?._id === current._id);
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

  @action toggleEdit() {
    this.isEditEmail ? this.isEditEmail = false : this.isEditEmail = true;
  }

  listenToUserUpdate() {
    this.root.socketAdapter.listenToEvent('usersUpdate', user => {
      this.root.lis.currentUser = user;
    });
  }

  listenToErrors() {
    this.root.socketAdapter.listenToEvent('errorHandler', msg => {
      alert(msg);
    });
  }

}
