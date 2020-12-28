import {Injectable} from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient} from '@angular/common/http';
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


  async uploadImage(image: File): Promise<Response> {
    const formData = new FormData();
    formData.append('image', image);

    return await this.post('photos', formData);
  }

}
