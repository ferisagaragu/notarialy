import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../../core/http/quote.service';
import { QuoteModel } from '../../../core/models/quote.model';

@Component({
  selector: 'app-form-pdf',
  templateUrl: './form-pdf.component.html',
  styleUrls: ['./form-pdf.component.scss']
})
export class FormPdfComponent implements OnInit {

  quote: QuoteModel;

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.quoteService.findQuoteByUuid('960a65d8-4639-4e9a-b6e1-0b0651454e33').subscribe(
      resp => {
        this.quote = resp;
        console.log(resp);
      }, error => {

      }
    )
  }

}
