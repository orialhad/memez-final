import {ChangeDetectionStrategy, Component, OnInit}          from '@angular/core';
import {UserStore}                                           from '../../stores/entities/user.store';
import {ErrorStateMatcher}                                   from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}


@Component({
  selector       : 'mem-user-profile',
  templateUrl    : './user-profile.component.html',
  styleUrls      : ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserProfileComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher   = new MyErrorStateMatcher();
  startDate = new Date(1990, 0, 1);

  constructor(
    public us: UserStore
  ) {
    setTimeout(async () => {
      await this.us.getCurrentUser();
      await this.us.root.ps.getPosts();
    }, 2000);
  }

  async ngOnInit(): Promise<void> {
  }


}
