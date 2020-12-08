import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoginStore} from '../../stores/views/login.store';

@Component({
  selector: 'mem-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {


  constructor(
    public lis : LoginStore,
  ) { }

  ngOnInit(): void {
  }

}
