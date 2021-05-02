//region Imports
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FeedStore}                                  from '../../stores/views/feed.store';

//endregion

@Component({
  selector       : 'mem-feed',
  templateUrl    : './feed.component.html',
  styleUrls      : ['./feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {

  constructor(
    public fs: FeedStore
  ) {

    setTimeout(async () => {
      await this.fs.root.us.getCurrentUser();
      await this.fs.root.ps.getPosts();
    }, 2000);
  }

  async ngOnInit(): Promise<void> {
    await this.fs.root.us.getCurrentUser();
    await this.fs.root.ps.getPosts();
  };

}
