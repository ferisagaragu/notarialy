import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuoteModel } from '../../../core/models/quote.model';
import { MatDialog } from '@angular/material/dialog';
import { FormQuoteComponent } from '../form-quote/form-quote.component';
import { SweetAlert2Service } from 'ng-urxnium';
import { QuoteService } from '../../../core/http/quote.service';

@Component({
  selector: 'app-item-quote',
  templateUrl: './item-quote.component.html',
  styleUrls: ['./item-quote.component.scss']
})
export class ItemQuoteComponent {

  @Input() quote: QuoteModel;
  @Output() onChange: EventEmitter<void>;

  size: number;

  constructor(
    private dialog: MatDialog,
    private swal: SweetAlert2Service,
    private quoteService: QuoteService
  ) {
    this.onChange = new EventEmitter<void>();
    this.size = window.innerWidth;
  }

  updateQuote(): void {
    const dialogRef = this.dialog.open(
      FormQuoteComponent,
      {
        id: 'formQuote',
        width: window.innerWidth < 576 ? '95%' : '',
        height: window.innerWidth < 576 ? '95%' : '',
        maxWidth: window.innerWidth < 576 ? 'none' : '80vw',
        disableClose: true,
        data: this.quote
      }
    );

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.onChange.emit();
      }
    });
  }

  deleteQuote(): void {
    this.swal.fire({
      icon: 'warning',
      title: '¿Estas seguro que quieres eliminar el presupuesto?',
      text: 'Los datos se perderán permanentemente.',
      showCancelButton: true,
      theme: 'material'
    }).subscribe(resp => {
      if (resp) {
        this.quoteService.deleteQuote(this.quote.uuid).subscribe(_ => {
          this.onChange.emit();
        }, ({ error }) => {
          this.swal.fire({
            icon: 'error',
            title: error.message,
            text:
              'Hubo un error al eliminar el presupuesto. ' +
              'Lamentamos los inconvenientes inténtalo mas tarde.',
            theme: 'material'
          });
        });
      }
    });
  }

  getClientName(): string {
    const { name, surname, motherSurname } = this.quote.client;
    return `${name} ${surname} ${motherSurname}`;
  }

}
