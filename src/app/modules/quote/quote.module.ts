import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { FormPdfComponent } from './form-pdf/form-pdf.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewQuoteComponent } from './view-quote/view-quote.component';
import { ExpansionQuoteDetailComponent } from './expansion-quote-detail/expansion-quote-detail.component';
import { FormWorkComponent } from './form-work/form-work.component';
import { TableWorkComponent } from './table-work/table-work.component';

@NgModule({
  declarations: [FormPdfComponent, ViewQuoteComponent, ExpansionQuoteDetailComponent, FormWorkComponent, TableWorkComponent],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    SharedModule
  ]
})
export class QuoteModule { }
