import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadAdapter extends BaseAjaxAdapter {


  constructor(
    http: HttpClient
  ) {
    super(http);
  }




  async uploadFile(file: FormData): Promise<Response> {

    console.log(`form data: ` + file)
    return await this.post_data('uploads',file);
    // console.log(`adapter `+ file)
    // return
  }

}
