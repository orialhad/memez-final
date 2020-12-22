import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SignupStore} from '../../stores/views/signup.store';

@Component({
  selector: 'mem-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {

  constructor(
    public sus: SignupStore
  ) { }

  ngOnInit(): void {
  }

}
