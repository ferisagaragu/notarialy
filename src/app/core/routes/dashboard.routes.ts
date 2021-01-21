import { Routes } from '@angular/router';
import { ListQuoteComponent } from '../../modules/dashboard/list-quote/list-quote.component';

export const DASHBOARD_ROUTING: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

export const DASHBOARD_ROUTING_CHILDREN: Routes = [
  {
    path: '',
    component: ListQuoteComponent
  }
];
