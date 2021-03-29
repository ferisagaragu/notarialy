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

  constructor(
    private dialog: MatDialog,
    private swal: SweetAlert2Service,
    private quoteService: QuoteService
  ) {
    this.onChange = new EventEmitter<void>();
  }

  updateQuote(): void {
    const dialogRef = this.dialog.open(
      FormQuoteComponent,
      {
        id: 'formQuote',
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
      icon: 'question',
      title: '¿Estas seguro que quieres eliminar el presupuesto?',
      text: 'Los datos se perderán permanentemente',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      showCancelButton: true
    }).subscribe(resp => {
      if (resp) {
        this.quoteService.deleteQuote(this.quote.uuid).subscribe(_ => {
          this.onChange.emit();
        }, _ => {
          console.log('no funciona');
        });
      }
    });
  }

  getClientName(): string {
    const { name, surname, motherSurname } = this.quote.client;
    return `${name} ${surname} ${motherSurname}`;
  }

}
