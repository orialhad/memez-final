import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoginStore}                                 from '../../stores/views/login.store';
import {RootStore}                                  from '../../stores/root.store';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'mem-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {
  faSearch = faSearch;

  constructor(
    public root: RootStore
  ) { }

  ngOnInit(): void {
  }

}
