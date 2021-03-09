import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuoteService } from '../../../core/http/quote.service';
import { QuoteModel } from '../../../core/models/quote.model';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.scss']
})
export class ViewQuoteComponent implements OnInit {

  quote: QuoteModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quoteService: QuoteService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.quoteService.findQuoteByUuid(params.uuid).subscribe(
        resp => {
          this.quote = resp;
        }, error => {

        }
      );
    });
  }

}
