import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListQuoteComponent } from './list-quote/list-quote.component';
import { FormQuoteComponent } from './form-quote/form-quote.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListQuoteComponent, FormQuoteComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
