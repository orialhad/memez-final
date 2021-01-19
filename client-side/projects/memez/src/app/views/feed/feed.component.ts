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
    (async ()=>{
      await this.fs.root.ps.getPosts();
    })()

    setTimeout(async ()=>{
      await this.fs.root.ps.getPosts()},700)
  }

  async ngOnInit(): Promise<void> {
    this.fs.root.us.getCurrentUser()
    await this.fs.root.ps.getPosts();
  };

}
