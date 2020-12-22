import {Injectable} from '@angular/core';
import {RootStore} from '../root.store';
import {autorun, toJS} from 'mobx';
import {action, observable} from 'mobx-angular';



@Injectable({
  providedIn: 'root'
})
export class UploadStore {

  file: File

  constructor(
    public root: RootStore
  ) {
    this.root.ups = this;
    window['ups'] = this;
    autorun(() => {

    });



  }



  @action async onUpload(file){
    // file.name = file.name.replace(/ /g,'')
    this.file = file
    console.log(`Upload Store: `,this.file)
    await this.root.uploadAdapter.uploadImage(file)
  }

}

