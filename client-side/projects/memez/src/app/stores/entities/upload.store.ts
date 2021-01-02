import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {autorun, toJS} from 'mobx';
import {action, computed, observable} from 'mobx-angular';
import {FileUploader} from 'ng2-file-upload';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class UploadStore {

  @observable files_blabla;
  @observable file: File;
  @observable newFileName: string ;


  constructor(
    public root: RootStore,
  ) {
    this.root.ups = this;
    window['ups'] = this;
    autorun(() => {

    });


  }


  @action
  async onUpload(file) {
    this.file = file;
    const formData = new FormData();
    formData.append('file', this.file);
    console.log(`Upload Store: `, this.file);
    await this.root.uploadAdapter.uploadFile(formData);
    this.newFileName = this.root.uploadAdapter.newFile;
    console.log(`Upload Store: `, this.newFileName);

  }

  @action
  async getFile(filename: string) {
    const file1 = await this.root.uploadAdapter.getFile(filename);
    console.log(`file1: `, file1);
    const file_blob = new Blob([file1], {type: file1.contentType}),
          fileURL   = URL.createObjectURL(file_blob);
    console.log('file_blob: ', file_blob);
    console.log('fileURL: ', fileURL);

  }

  // @action
  // async getLastUpload() {
  //   const file1     = await this.root.uploadAdapter.getLastUpload(),
  //         file_blob = new Blob([file1], {type: file1.contentType}),
  //         fileURL   = URL.createObjectURL(file_blob).toString();
  //   // this.files_blabla =this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
  //   //  return this.sanitizer.bypassSecurityTrustUrl(fileURL);
  //   return fileURL
  // }


}

