import { Component, OnInit } from '@angular/core';
import { CompanyModel } from '../../../core/models/company.model';
import { ClientModel } from '../../../core/models/client.model';
import { QuoteService } from '../../../core/http/quote.service';
import { MatDialog } from '@angular/material/dialog';
import { convertMoneyToNumber } from '../../../core/functions/convert-money-to-number';

@Component({
  selector: 'app-stepper-quote',
  templateUrl: './stepper-quote.component.html',
  styleUrls: ['./stepper-quote.component.scss']
})
export class StepperQuoteComponent implements OnInit {

  companySelected: CompanyModel;
  clienteSelected: ClientModel;

  constructor(
    private quoteService: QuoteService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  saveQuote(event: any): void {
    this.quoteService.createQuote({
      companyUuid: this.companySelected.uuid,
      clientUuid: this.clienteSelected.uuid,
      createDate: event.createDate.format(),
      workforce: convertMoneyToNumber(event.workforce)
    }).subscribe(resp => {
      console.log(resp);
      this.dialog.closeAll();
    }, ({ error }) => {

    });
  }

}
