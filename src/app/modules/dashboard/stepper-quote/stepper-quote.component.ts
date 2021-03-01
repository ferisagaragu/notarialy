import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyModel } from '../../../core/models/company.model';
import { ClientModel } from '../../../core/models/client.model';

@Component({
  selector: 'app-stepper-quote',
  templateUrl: './stepper-quote.component.html',
  styleUrls: ['./stepper-quote.component.scss']
})
export class StepperQuoteComponent implements OnInit {

  companySelected: CompanyModel;
  clienteSelected: ClientModel;

  constructor() { }

  ngOnInit(): void { }

  saveQuote(event: any): void {
    console.log({
      companyUuid: this.companySelected.uuid,
      clientUuid: this.clienteSelected.uuid,
      createDate: event.createDate.format(),
      workforce: event.workforce
    });
  }

}
