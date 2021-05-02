import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {action, observable} from 'mobx-angular';


@Injectable({
  providedIn: 'root'
})
export class UploadStore {

  @observable file: File;
  @observable newFileName: string;
  @observable loading: boolean = false;


  constructor(
    public root: RootStore,
  ) {
    this.root.ups = this;
    window['ups'] = this;
  }

  @action
  async onUpload(file) {
    this.file = file;
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.file);
    const upload = await this.root.uploadAdapter.uploadFile(formData);
    this.newFileName = upload.filename;
    this.loading     = false;
  }
}

