import {Observable} from 'rxjs';
import {T} from '@angular/cdk/keycodes';
import {HttpResponse} from '@angular/common/http';
import {APIEvent} from '../../../../../../../sheard/api/api-events';

export interface IBaseAdapter {

  request<T>(event: APIEvent, data:any): Promise<T>;

  listenToEvent<T = any>(event_name: APIEvent, fn: Function): void

  stopListeningToEvent<T = any>(event_name: APIEvent): void

  // get<T>(path: string): Promise<T>;
  //
  // get_image<T>(path: string):Promise<T>
}
