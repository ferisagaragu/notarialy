import { Routes } from '@angular/router';
import { ViewQuoteComponent } from '../../modules/quote/view-quote/view-quote.component';
import { AuthorizedGuard } from '../guards/authorized.guard';

export const QUOTE_ROUTING: Routes = [
  {
    path: 'quote',
    loadChildren: () => import('../../modules/quote/quote.module').then(m => m.QuoteModule),
    canActivate: [ AuthorizedGuard ]
  }
];

export const QUOTE_ROUTING_CHILDREN: Routes = [
  {
    path: ':uuid',
    component: ViewQuoteComponent
  }
];
