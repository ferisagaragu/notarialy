import { Component, Input, OnInit } from '@angular/core';
import { QuoteModel } from '../../../core/models/quote.model';

@Component({
  selector: 'app-item-quote',
  templateUrl: './item-quote.component.html',
  styleUrls: ['./item-quote.component.scss']
})
export class ItemQuoteComponent implements OnInit {

  @Input() quote: QuoteModel;

  constructor() { }

  ngOnInit(): void {
  }

}
