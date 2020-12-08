import {IBaseAdapter} from '../types/interfaces/IBaseAdapter';
import {HttpClient} from '@angular/common/http';


export abstract class BaseAjaxAdapter implements IBaseAdapter {
  BASE_URL = 'http://localhost:4300/';

  protected constructor(
    protected http: HttpClient
  ) {
  }


  async request<T>(path: string): Promise<T> {
    return this.http
      .get<T>(`${this.BASE_URL}/${path}`)
      .toPromise<T>();
  }

  async post(path: string, body: string): Promise<any> {
    return this.http
      .post(`${this.BASE_URL}/${path}`, body)
      .toPromise()
  }

  async delete(path: string): Promise<any> {
    return this.http
      .delete(`${this.BASE_URL}/${path}`)
      .toPromise()
  }
}
