import {IBaseAdapter} from '../types/interfaces/IBaseAdapter';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {IUser} from '..../../../../sheard/interfaces/IUser';
import {Observable} from 'rxjs';
import {BaseUrl} from '../config/config';


export abstract class BaseAjaxAdapter implements IBaseAdapter {
  BASE_URL = BaseUrl;

  protected constructor(
    protected http: HttpClient
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };



//trying something
  async get_image<T>(path: string): Promise<T> {
    return this.http
               .get<T>(`${this.BASE_URL}/${path}`,{responseType:'blob' as 'json'})
               .toPromise<T>()

  }


  async get<T>(path: string): Promise<T> {
    return this.http
               .get<T>(`${this.BASE_URL}/${path}`)
               .toPromise<T>();
  }


  async post(path: string, body: string | FormData | IUser): Promise<any> {
    return this.http
               .post(`${this.BASE_URL}/${path}`, body || FormData, this.httpOptions)
               .toPromise();
  }


  async post_avatar(path: string, body: {avatar : string}): Promise<any> {
    return this.http
               .post(`${this.BASE_URL}/${path}`, body)
               .toPromise();
  }

  async post_data(path: string, body: string | IUser | File | FormData): Promise<any> {
    return this.http
               .post(`${this.BASE_URL}/${path}`, body || FormData)
               .toPromise();
  }

  async delete(path: string): Promise<any> {
    return this.http
               .delete(`${this.BASE_URL}/${path}`)
               .toPromise();
  }
}
