import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { QuoteModel } from '../../../core/models/quote.model';
import { QuoteService } from '../../../core/http/quote.service';
import { convertMoneyToNumber } from '../../../core/functions/convert-money-to-number';
import { CompanyService } from '../../../core/http/company.service';
import { ClientService } from '../../../core/http/client.service';
import { CompanyModel } from '../../../core/models/company.model';
import { ClientModel } from '../../../core/models/client.model';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';
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
  companies: Array<CompanyModel>;
  clients: Array<ClientModel>;
  load: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private companyService: CompanyService,
    private clientService: ClientService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: QuoteModel
  ) {
    this.moneyMask = { alias: 'pesos' };
    this.saveQuote = new EventEmitter<any>();
    this.load = false;
  }

  ngOnInit() {
    this.createForm();
  }

  save(): void {
    if (this.data) {
      const { createDate, workforce, companyUuid, clientUuid } = this.form.value;
      this.load = true;
      this.form.disable();

      this.quoteService.updateQuote({
        uuid: this.data.uuid,
        createDate: moment(createDate),
        workforce: convertMoneyToNumber(workforce),
        companyUuid,
        clientUuid
      }).subscribe(
        _ => {
          this.load = false;
          this.form.enable();
          this.dialog.getDialogById('formQuote').close('update');
        }, error => {
          this.load = false;
        }
      )
    } else {
      this.saveQuote.emit(this.form.value);
    }
  }

  onCancel(): void {
    this.dialog.getDialogById('formQuote').close();
  }

  private createForm(): void {
    if (this.data) {
      this.form = this.formBuilder.group({
        companyUuid: [null],
        clientUuid: [null],
        workforce: [this.data.workforce],
        createDate: [moment(this.data.createDate)]
      });
    } else {
      this.form = this.formBuilder.group({
        workforce: [0],
        createDate: [moment()]
      });
    }

    if (this.data) {
      this.findAllCompanies();
      this.findAllClients();
    }
  }

  private findAllCompanies(): void {
    this.companyService.findAllCompanies().subscribe(
      resp => {
        this.companies = resp;
        this.form.get('companyUuid').setValue(this.data.company.uuid);
      }, ({ error }) => {
        this.dialog.open(
          AlertDialogComponent,
          {
            role: 'alertdialog',
            width: '440px',
            data: {type: 'error', message: error.message}
          }
        );
      }
    )
  }

  private findAllClients(): void {
    this.clientService.findAllClients().subscribe(
      resp => {
        this.clients = resp;
        this.form.get('clientUuid').setValue(this.data.client.uuid);
      }, ({ error }) => {
        this.dialog.open(
          AlertDialogComponent,
          {
            role: 'alertdialog',
            width: '440px',
            data: { type: 'error', message: error.message }
          }
        );
      }
    )
  }

}
