import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoginStore} from '../../stores/views/login.store';

@Component({
  selector: 'mem-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {

  constructor(
    public log: LoginStore
  ) { }

  ngOnInit(): void {
  }

}
