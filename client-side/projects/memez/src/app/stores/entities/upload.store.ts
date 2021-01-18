import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';


@Injectable({
  providedIn: 'root'
})
export class UploadStore {

  @observable file: File;
  @observable newFileName: string;
  @observable loading: boolean = false



  constructor(
    public root: RootStore,
  ) {
    this.root.ups = this;
    window['ups'] = this;
  }


  @action
  async onUpload(file) {
    this.file = file;
    this.loading = true
    const formData = new FormData();
    formData.append('file', this.file);
    console.log(`Upload Store_before: `, this.file);
    await this.root.uploadAdapter.uploadFile(formData);
    this.newFileName = this.root.uploadAdapter.newFile;
    this.loading = false
    console.log(`Upload Store_after: `, this.newFileName);

  }

  // @action
  // async getFile(filename: string) {
  //   const file1 = await this.root.uploadAdapter.getFile(filename);
  //   console.log(`file1: `, file1);
  //   const file_blob = new Blob([file1], {type: file1.contentType}),
  //         fileURL   = URL.createObjectURL(file_blob);
  //   console.log('file_blob: ', file_blob);
  //   console.log('fileURL: ', fileURL);
  //
  // }

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

