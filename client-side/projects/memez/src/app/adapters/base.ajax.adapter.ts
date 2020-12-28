import {IBaseAdapter} from '../types/interfaces/IBaseAdapter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../types/interfaces/IUser';


export abstract class BaseAjaxAdapter implements IBaseAdapter {
  BASE_URL = 'http://localhost:4300/api';

  protected constructor(
    protected http: HttpClient
  ) {
  }


  async request<T>(path: string): Promise<T> {
    return this.http
      .get<T>(`${this.BASE_URL}/${path}`)
      .toPromise<T>();
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  async post(path: string, body: string | IUser  ): Promise<any> {
    return this.http
      .post(`${this.BASE_URL}/${path}`, body || FormData, this.httpOptions )
      .toPromise();
  }
  async post_data(path: string, body: string | IUser | File | FormData): Promise<any> {
    return this.http
      .post(`${this.BASE_URL}/${path}`, body || FormData )
      .toPromise();
  }

  async delete(path: string): Promise<any> {
    return this.http
      .delete(`${this.BASE_URL}/${path}`)
      .toPromise();
  }
}
