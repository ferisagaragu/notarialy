import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormQuoteComponent } from './form-quote/form-quote.component';
import { SharedModule } from '../../shared/shared.module';
import { StepperQuoteComponent } from './stepper-quote/stepper-quote.component';
import { FormCompanyComponent } from './form-company/form-company.component';
import { FormClientComponent } from './form-client/form-client.component';
import { ItemQuoteComponent } from './item-quote/item-quote.component';
import { TabQuoteComponent } from './tab-quote/tab-quote.component';
import { ItemCompanyComponent } from './item-company/item-company.component';
import { FormTelephoneComponent } from './form-telephone/form-telephone.component';
import { ItemClientComponent } from './item-client/item-client.component';
import { ViewerMapComponent } from './viewer-map/viewer-map.component';

@NgModule({
  declarations: [
    FormQuoteComponent,
    StepperQuoteComponent,
    FormCompanyComponent,
    FormClientComponent,
    ItemQuoteComponent,
    TabQuoteComponent,
    ItemCompanyComponent,
    FormTelephoneComponent,
    ItemClientComponent,
    ViewerMapComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
