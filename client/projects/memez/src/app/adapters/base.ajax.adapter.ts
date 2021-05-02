//region Imports
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser}                   from '..../../../../sheard/interfaces/IUser';
import {BaseUrl}                 from '../config/config';
import {APIEvent}                from '../../../../../../sheard/api/api-events';
import {IBaseAdapter}            from '../../../../../../sheard/interfaces/IBaseAdapter';
//endregion


export abstract class BaseAjaxAdapter implements IBaseAdapter {

  BASE_URL = BaseUrl + '/api';

  protected constructor(
    protected http: HttpClient
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  async request<T>(path: string): Promise<T> {
    return this.http
               .get<T>(`${this.BASE_URL}/${path}`, {withCredentials: true})
               .toPromise<T>();
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


  async post_avatar(path: string, body: { avatar: string }): Promise<any> {
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

  async listenToEvent<T = any>(event_name: APIEvent, fn: Function): Promise<void> {
    return;
  }

  async stopListeningToEvent<T = any>(event_name: APIEvent): Promise<void> {
    return;
  }
}
