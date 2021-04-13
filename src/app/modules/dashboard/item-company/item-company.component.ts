import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyModel } from '../../../core/models/company.model';
import { FormCompanyComponent } from '../form-company/form-company.component';
import { SweetAlert2Service } from 'ng-urxnium';
import { CompanyService } from '../../../core/http/company.service';

@Component({
  selector: 'app-item-company',
  templateUrl: './item-company.component.html',
  styleUrls: ['./item-company.component.scss']
})
export class ItemCompanyComponent {

  @Input() company: CompanyModel;
  @Output() onChange: EventEmitter<void>;

  constructor(
    private dialog: MatDialog,
    private swal: SweetAlert2Service,
    private companyService: CompanyService
  ) {
    this.onChange = new EventEmitter<void>();
  }

  updateCompany(): void {
    const dialogRef = this.dialog.open(
      FormCompanyComponent,
      {
        id: 'formCompany',
        disableClose: true,
        data: this.company,
        width: '75%'
      }
    );

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.onChange.emit();
      }
    });
  }

  deleteCompany(): void {
    this.swal.fire({
      icon: 'warning',
      title: '¿Estas seguro que quieres eliminar la compañía?',
      text: 'Los datos se perderán permanentemente.',
      showCancelButton: true,
      theme: 'material'
    }).subscribe(resp => {
      if (resp) {
        this.companyService.deleteCompany(this.company.uuid).subscribe(_ => {
          this.onChange.emit();
        }, ({ error }) => {
          this.swal.fire({
            icon: 'error',
            title: error.message,
            text:
              'Hubo un error al eliminar el compañía. ' +
              'Lamentamos los inconvenientes inténtalo mas tarde.',
            theme: 'material'
          });
        });
      }
    });
  }

}
