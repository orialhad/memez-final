import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FeedStore} from '../../stores/views/feed.store';

@Component({
  selector: 'mem-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {

  constructor(
    public fs: FeedStore
  ) {
  }

  ngOnInit(): void {
    this.fs.root.us.getCurrentUser()

  };

}
