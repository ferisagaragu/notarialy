import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-form-quote',
  templateUrl: './form-quote.component.html',
  styleUrls: ['./form-quote.component.scss']
})
export class FormQuoteComponent implements OnInit {

  @Output() saveQuote: EventEmitter<any>;

  form: FormGroup;
  moneyMask: any;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.moneyMask = { alias: 'pesos' };
    this.saveQuote = new EventEmitter<any>();
  }

  ngOnInit() {
    this.createForm();
  }

  save(): void {
    this.saveQuote.emit(this.form.value);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      workforce: [0],
      createDate: [moment()]
    });
  }

}
