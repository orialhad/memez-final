//endregion
import * as io                    from 'socket.io-client';
import {Socket as SocketIOClient} from 'socket.io-client';
import {Injectable}               from '@angular/core';
import {v4 as uuidv4}             from 'uuid';
import {APIEvent}                 from '../../../../../../sheard/api/api-events';
import {IBaseAdapter}             from '../../../../../../sheard/interfaces/IBaseAdapter';
import * as Emitter               from 'component-emitter';
import {BaseUrl}                  from '../config/config';

//endregion


@Injectable({
  providedIn: 'root'
})
export class BaseSocketAdapter implements IBaseAdapter {
  socket: SocketIOClient;
  user;

  constructor() {

    // @ts-ignore
    this.socket = io(BaseUrl, {transports: ['websocket'], upgrade: false});

    this.socket.on('connect', () => {
        console.log('SOCKET CONNECTED (:');
      }
    );
    this.socket.on('reconnect', (sock) => {
      console.log('SOCKET RECONNECTED!!');
    });
    this.socket.on('disconnect', () => {
      console.log('SOCKET DISCONNECTED :(');
    });
  }

  async request<T = any>(event_name: APIEvent, data?) {

    return new Promise<T>((resolve, reject) => {
      const req_id = uuidv4();
      if (this.socket && this.socket.connected) {
        this.socket.emit(event_name, data, req_id);
        let emitter: Emitter;
        const
          fn = (res_data, request_id) => {
            if (request_id !== req_id) {
              return;
            }
            resolve(res_data as T);
            emitter.off(event_name, fn);
          };

        emitter = this.socket.on(event_name, fn);

      } else {
        console.log('SocketAPI: no sockets connected...');
      }
    });

  }

  listenToEvent<T = any>(event_name: APIEvent, fn: Function) {
    this.socket && this.socket.on(event_name, fn);

  }

  async stopListeningToEvent<T = any>(event_name: APIEvent) {
    this.socket && this.socket.off(event_name);

  }


}
