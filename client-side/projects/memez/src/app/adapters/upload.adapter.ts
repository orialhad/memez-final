import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {observable} from 'mobx-angular';


@Injectable({
  providedIn: 'root'
})
export class UploadAdapter extends BaseAjaxAdapter {

  @observable newFile :string

  constructor(
    http: HttpClient
  ) {
    super(http);
    window['uploadAdapter'] = this;
  }




  async uploadFile(file: FormData): Promise<Response> {
    const post  = await   this.post_data('uploads', file)
    this.newFile = post.filename
    return post


  }

   async getFile(filename): Promise<any> {

     return await this.get_image(`image/${filename}`)
  }
  async getLastUpload(): Promise<any> {
     return await this.get_image(`images`)
  }




}
