import { Injectable } from '@angular/core';
import {RootStore} from '../root.store';

@Injectable({
  providedIn: 'root'
})
export class FeedStore {

  constructor(
    public root : RootStore
  ) {
    this.root.fs = this;
    window['fs'] = this;
  }
}
