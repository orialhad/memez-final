import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LayoutStore} from '../../stores/views/layout.store';
import {LikeStore} from '../../stores/entities/like.store';
import {UserStore} from '../../stores/entities/user.store';
import {RootStore} from '../../stores/root.store';
import {PostStore} from '../../stores/entities/post.store';
import {FeedStore} from '../../stores/views/feed.store';
import {LoginStore} from '../../stores/views/login.store';
import {UploadStore} from '../../stores/entities/upload.store';
import {AuthService} from '../../stores/entities/auth.service';

@Component({
  selector       : 'mem-layout',
  templateUrl    : './layout.component.html',
  styleUrls      : ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  constructor(
    public root: RootStore,
    public ps: PostStore,
    public us: UserStore,
    public lks: LikeStore,
    public fs: FeedStore,
    public lys: LayoutStore,
    public lis: LoginStore,
    public auth: AuthService,
    public ups: UploadStore
  ) {

  }

  ngOnInit(): void {
  }

}
