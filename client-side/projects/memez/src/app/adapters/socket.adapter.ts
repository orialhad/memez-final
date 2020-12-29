import * as io from 'socket.io-client';
import {Injectable} from "@angular/core";
import {Socket as SocketIOClient} from  'socket.io-client'


export type APIEvent = 'ping'


const URL = 'http://localhost:4300';



@Injectable({
  providedIn: 'root'
})
export class SocketAdapter {

  socket;
  user;


  constructor() {

    this.socket = io(URL,{transports: ['websockets'],upgrade:false})

    this.socket.on("connect",()=>{
      console.log("Socket Connected !!!")
    })


  }

}
