import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QUOTE_ROUTING_CHILDREN } from '../../core/routes/quote.routes';

const routes: Routes = [
  ...QUOTE_ROUTING_CHILDREN
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
