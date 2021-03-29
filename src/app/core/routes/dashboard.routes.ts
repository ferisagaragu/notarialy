import { Routes } from '@angular/router';
import { AuthorizedGuard } from '../guards/authorized.guard';
import { TabQuoteComponent } from '../../modules/dashboard/tab-quote/tab-quote.component';

export const DASHBOARD_ROUTING: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [ AuthorizedGuard ]
  }
];

export const DASHBOARD_ROUTING_CHILDREN: Routes = [
  {
    path: '',
    component: TabQuoteComponent
  }
];
