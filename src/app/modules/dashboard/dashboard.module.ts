import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListQuoteComponent } from './list-quote/list-quote.component';
import { FormQuoteComponent } from './form-quote/form-quote.component';
import { SharedModule } from '../../shared/shared.module';
import { StepperQuoteComponent } from './stepper-quote/stepper-quote.component';
import { FormCompanyComponent } from './form-company/form-company.component';
import { FormClientComponent } from './form-client/form-client.component';
import { ItemQuoteComponent } from './item-quote/item-quote.component';

@NgModule({
  declarations: [
    ListQuoteComponent,
    FormQuoteComponent,
    StepperQuoteComponent,
    FormCompanyComponent,
    FormClientComponent,
    ItemQuoteComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
