import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserStore} from '../../stores/entities/user.store';

@Component({
  selector: 'mem-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  constructor(
    public us: UserStore
  ) { }

  ngOnInit(): void {
    this.us.root.us.getCurrentUser()
  }

}
