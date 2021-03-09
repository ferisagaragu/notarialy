import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuoteService } from '../../../core/http/quote.service';
import { QuoteModel } from '../../../core/models/quote.model';
import { StepperQuoteComponent } from '../stepper-quote/stepper-quote.component';

@Component({
  selector: 'app-list-quote',
  templateUrl: './list-quote.component.html',
  styleUrls: ['./list-quote.component.scss']
})
export class ListQuoteComponent implements OnInit {

  quotes: Array<QuoteModel>;

  constructor(
    private dialog: MatDialog,
    private quoteService: QuoteService
  ) { }

  ngOnInit(): void {
    this.quoteService.findAllQuotes().subscribe(
      resp => {
        this.quotes = resp;
      }, () => {

      }
    );
  }

  openDialog(): void {
    this.dialog.open(
      StepperQuoteComponent,
      {
        width: '50%',
        height: '75%',
        disableClose: true
      }
    );
  }
}
