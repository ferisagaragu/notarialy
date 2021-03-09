import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BASE_ROUTES } from './core/routes/base.routes';
import { DASHBOARD_ROUTING } from './core/routes/dashboard.routes';
import { QUOTE_ROUTING } from './core/routes/quote.routes';

const routes: Routes = [
  ...BASE_ROUTES,
  ...DASHBOARD_ROUTING,
  ...QUOTE_ROUTING
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
