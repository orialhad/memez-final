import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFile} from '../types/interfaces/IFile';


@Injectable({
  providedIn: 'root'
})
export class UploadAdapter extends BaseAjaxAdapter {


  constructor(
    http: HttpClient
  ) {
    super(http);
    window['uploadAdapter'] = this;
  }




  async uploadFile(file: FormData): Promise<Response> {
    console.log(`form data: ` + file);
    return  this.post_data('uploads', file);
  }

  async getFiles(filename): Promise<IFile[]> {
    console.log('filename form client: ', filename)
    return await this.request(`uploads/${filename}`);
  }

}
