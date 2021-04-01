import { Routes } from '@angular/router';
import { SignInComponent } from '../../modules/auth/sign-in/sign-in.component';
import { UnauthorizedGuard } from '../guards/unauthorized.guard';
import { LoadSignInComponent } from '../../modules/auth/load-sign-in/load-sign-in.component';

export const AUTH_ROUTING: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../../modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [ UnauthorizedGuard ]
  }
];

export const AUTH_ROUTING_CHILDREN: Routes = [
  {
    path: '',
    component: SignInComponent
  }, {
    path: 'sign-in',
    component: LoadSignInComponent
  }
];
