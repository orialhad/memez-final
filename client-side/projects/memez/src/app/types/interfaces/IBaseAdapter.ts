import {Observable} from 'rxjs';
import {T} from '@angular/cdk/keycodes';
import {HttpResponse} from '@angular/common/http';

export interface IBaseAdapter {
  request<T>(path: string): Promise<T>;

  get_image<T>(path: string):Promise<T>
}
