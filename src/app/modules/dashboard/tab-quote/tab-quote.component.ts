import { Component, OnInit } from '@angular/core';
import { QuoteModel } from '../../../core/models/quote.model';
import { MatDialog } from '@angular/material/dialog';
import { QuoteService } from '../../../core/http/quote.service';
import { StepperQuoteComponent } from '../stepper-quote/stepper-quote.component';
import { CompanyService } from '../../../core/http/company.service';
import { CompanyModel } from '../../../core/models/company.model';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';
import { FormTelephoneComponent } from '../form-telephone/form-telephone.component';
import { SweetAlert2Service, SessionService } from 'ng-urxnium';
import { ClientService } from '../../../core/http/client.service';
import { ClientModel } from '../../../core/models/client.model';

@Component({
  selector: 'app-tab-quote',
  templateUrl: './tab-quote.component.html',
  styleUrls: ['./tab-quote.component.scss']
})
export class TabQuoteComponent implements OnInit {

  load: boolean;
  quotes: Array<QuoteModel>;
  companies: Array<CompanyModel>;
  clients: Array<ClientModel>;

  constructor(
    private dialog: MatDialog,
    private swal: SweetAlert2Service,
    private quoteService: QuoteService,
    private companyService: CompanyService,
    private clientService: ClientService,
    private sessionService: SessionService
  ) {
    this.load = true;
    this.quotes = [];
    this.companies = [];
    this.clients = [];

    this.showFormTelephone();
  }

  ngOnInit(): void {
    this.reloadAll();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
      StepperQuoteComponent,
      {
        width: '50%',
        height: '75%',
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(_ => {
      this.reloadAll();
    });
  }

  reloadAll(): void {
    this.findAllQuotes();
    this.findAllCompanies();
    this.findAllClients();
  }

  private findAllQuotes(): void {
    this.load = true;

    this.quoteService.findAllQuotes().subscribe(
      resp => {
        this.quotes = resp;
        this.load = false;
      }, ({ error }) => {
        this.swal.fire({
          icon: 'error',
          title: 'Upps',
          text: error.message
        });

        this.load = false;
      }
    );
  }

  private findAllCompanies(): void {
    this.load = true;

    this.companyService.findAllCompanies().subscribe(
      resp => {
        this.companies = resp;
        this.load = false;
      }, error => {
        this.dialog.open(
          AlertDialogComponent,
          {
            role: 'alertdialog',
            width: '440px',
            data: { type: 'error', message: error.message }
          }
        );

        this.load = false;
      }
    );
  }

  private findAllClients(): void {
    this.load = true;

    this.clientService.findAllClients().subscribe(
      resp => {
        this.clients = resp;
        this.load = false;
      }, error => {
        this.dialog.open(
          AlertDialogComponent,
          {
            role: 'alertdialog',
            width: '440px',
            data: { type: 'error', message: error.message }
          }
        );

        this.load = false;
      }
    );
  }

  private showFormTelephone(): void {
    const { phoneNumber } = this.sessionService.getUser();

    if (!phoneNumber) {
      this.dialog.open(
        FormTelephoneComponent,
        {
          id: 'formTelephone',
          width: '30%',
          height: '285px',
          disableClose: true
        }
      );
    }
  }

}
