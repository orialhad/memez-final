import { Injectable } from '@angular/core';
import {PostStore} from './entities/post.store';
import {UserStore} from './entities/user.store';
import {FeedStore} from './views/feed.store';
import {LayoutStore} from './views/layout.store';
import {LikeStore} from './entities/like.store';
import {PostAdapter} from '../adapters/post.adapter';
import {UserAdapter} from '../adapters/user.adapter';
import {LikeAdapter} from '../adapters/like.adapter';
import {LoginStore} from './views/login.store';
import {SignupStore} from './views/signup.store';
import {UploadAdapter} from '../adapters/upload.adapter';
import {UploadStore} from './entities/upload.store';
import {LoginAdapter} from '../adapters/login.adapter';
import {AuthService} from './entities/auth.service';
import {AuthGuardService} from './entities/auth-gurad.service';

@Injectable({
  providedIn: 'root'
})
export class RootStore {

  ps :PostStore;
  us: UserStore;
  fs: FeedStore;
  lys: LayoutStore;
  lks: LikeStore;
  lis: LoginStore;
  sus: SignupStore;
  ups: UploadStore;
  authService: AuthService;
  authGuard: AuthGuardService;

  constructor(
    public postAdapter: PostAdapter,
    public userAdapter: UserAdapter,
    public likeAdapter: LikeAdapter,
    public loginAdapter: LoginAdapter,
    public uploadAdapter: UploadAdapter

  ) {
    window['root'] = this;

  }
}
