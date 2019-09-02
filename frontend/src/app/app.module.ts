import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { DashboardComponent } from './views/sidebars/dashboard/dashboard.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { AddUserComponent } from './views/dialogs/add-user/add-user.component';

import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatSelectModule,
  MatSidenavModule, MatTooltipModule
} from '@angular/material';

import {AvatarModule} from "ngx-avatar";
import {HeaderInterceptor} from "./controls/interceptor/header.interceptor";
import {ErrorInterceptor} from "./controls/interceptor/error.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

// Services
import {AuthGuard} from "./controls/auth/auth.guard";
import {AuthService} from "./controls/auth/auth.service";
import {UserService} from "./controls/conversation/user.service";
import {GroupService} from "./controls/conversation/group.service";
import {ChannelService} from "./controls/conversation/channel.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'messages',
    component: MainComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    SignInComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AvatarModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    GroupService,
    ChannelService,
    UserService
  ],
  entryComponents: [AddUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
