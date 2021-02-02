import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoginStore}                                 from '../../stores/views/login.store';
import {FormControl, FormGroup, Validators}         from '@angular/forms';

@Component({
  selector       : 'mem-login',
  templateUrl    : './login.component.html',
  styleUrls      : ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public lis: LoginStore,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        password: new FormControl('',
          [Validators.required, Validators.minLength(6)])
      }
    );
  }

}
