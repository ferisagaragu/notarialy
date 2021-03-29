import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlert2Service } from 'ng-urxnium';
import { ClientModel } from '../../../core/models/client.model';
import { ViewerMapComponent } from '../viewer-map/viewer-map.component';
import { CLIENT_FORM_DIALOG, VIEWER_MAP_DIALOG } from '../../../core/constant/dialog-ids.constant';
import { ClientService } from '../../../core/http/client.service';
import { FormCompanyComponent } from '../form-company/form-company.component';
import { FormClientComponent } from '../form-client/form-client.component';

@Component({
  selector: 'app-item-client',
  templateUrl: './item-client.component.html',
  styleUrls: ['./item-client.component.scss']
})
export class ItemClientComponent implements OnInit {

  @Input() client: ClientModel;
  @Output() onChange: EventEmitter<void>;

  constructor(
    private dialog: MatDialog,
    private swal: SweetAlert2Service,
    private clientService: ClientService
  ) {
    this.onChange = new EventEmitter<void>();
  }

  ngOnInit(): void { }

  viewAddress(): void {
    this.dialog.open(
      ViewerMapComponent,
      {
        id: VIEWER_MAP_DIALOG,
        width: '45%',
        data: this.client,
        disableClose: true
      }
    )
  }

  updateClient(): void {
    const dialogRef = this.dialog.open(
      FormClientComponent,
      {
        id: CLIENT_FORM_DIALOG,
        disableClose: true,
        data: this.client,
        width: '75%',
        height: '75%'
      }
    );

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.onChange.emit();
      }
    });
  }

  deleteClient(): void {
    this.clientService.deleteClient(this.client.uuid).subscribe(
      _ => {
        this.onChange.emit();
      }, _ => {
        console.log('no funciona');
      }
    )
  }

  getClientName(): string {
    const { name, surname, motherSurname } = this.client;

    return `${name} ${surname} ${motherSurname}`;
  }

}
