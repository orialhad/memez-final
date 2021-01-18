import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './views/layout/layout.component';
import { FeedComponent } from './views/feed/feed.component';
import { PostComponent } from './reusable-components/post/post.component';
import {HttpClientModule} from '@angular/common/http';
import {MobxAngularModule}      from 'mobx-angular';
import { UserPostingComponent } from './views/user-posting/user-posting.component';
import {MatFormFieldModule}     from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/singup/signup.component';
import { NavBarComponent } from './views/nav-bar/nav-bar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadComponent } from './reusable-components/upload/upload.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {AngularCropperjsModule} from 'angular-cropperjs';

@NgModule({
  declarations: [
    LayoutComponent,
    FeedComponent,
    PostComponent,
    UserPostingComponent,
    UserProfileComponent,
    LoginComponent,
    SignupComponent,
    NavBarComponent,
    UploadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MobxAngularModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
    FileUploadModule,
    ImageCropperModule,
    AngularCropperjsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
