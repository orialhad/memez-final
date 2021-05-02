//region Imports
import {Injectable}      from '@angular/core';
import {BaseAjaxAdapter} from './base.ajax.adapter';
import {HttpClient}      from '@angular/common/http';
//endregion


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

  async uploadFile(file: FormData): Promise<any> {
    return await this.post_data('uploads', file);
  }
}
