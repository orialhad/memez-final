import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SignupStore}                                     from '../../stores/views/signup.store';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidator}                               from './password.validator';


@Component({
  selector: 'mem-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup

  constructor(
    public sus: SignupStore,
    public fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      password:new FormControl('',
        [Validators.required,PasswordValidator.strong,Validators.minLength(6)]),
      password2:new FormControl('',
        [Validators.required]),
      username:new FormControl('',
        [Validators.minLength(3)]),
      email:new FormControl('',
        [Validators.email]),
    });



  }

  get name() {
    return this.signupForm.get('name')
  }

  get password_1() {
    return this.signupForm.get('password')
  }
  get password_2() {
    return this.signupForm.get('password2')
  }get email() {
    return this.signupForm.get('email')
  }



}
