import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../../shared/shared.module';
import { LoadSignInComponent } from './load-sign-in/load-sign-in.component';

@NgModule({
  declarations: [SignInComponent, LoadSignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
