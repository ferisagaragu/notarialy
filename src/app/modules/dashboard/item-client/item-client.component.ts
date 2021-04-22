import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlert2Service } from 'ng-urxnium';
import { ClientModel } from '../../../core/models/client.model';
import { ViewerMapComponent } from '../viewer-map/viewer-map.component';
import { CLIENT_FORM_DIALOG, VIEWER_MAP_DIALOG } from '../../../core/constant/dialog-ids.constant';
import { ClientService } from '../../../core/http/client.service';
import { FormClientComponent } from '../form-client/form-client.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-item-client',
  templateUrl: './item-client.component.html',
  styleUrls: ['./item-client.component.scss']
})
export class ItemClientComponent {

  @Input() client: ClientModel;
  @Output() onChange: EventEmitter<void>;
  size: number;

  constructor(
    private dialog: MatDialog,
    private swal: SweetAlert2Service,
    private clientService: ClientService,
    private deviceService: DeviceDetectorService
  ) {
    this.onChange = new EventEmitter<void>();
    this.size = window.innerWidth;
  }

  viewAddress(): void {
    this.dialog.open(
      ViewerMapComponent,
      {
        id: VIEWER_MAP_DIALOG,
        width: window.innerWidth < 700 ? '95%' : '50%',
        data: this.client,
        disableClose: true,
        height: window.innerWidth < 700 ? '70%' : '68%',
        maxWidth: window.innerWidth < 700 ? 'none' : '80vw'
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
        height: window.innerWidth < 700 ? '95%' : '75%',
        width: window.innerWidth < 700 ? '95%' : '75%',
        maxWidth: window.innerWidth < 700 ? 'none' : '80vw'
      }
    );

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.onChange.emit();
      }
    });
  }

  deleteClient(): void {
    this.swal.fire({
      icon: 'warning',
      title: '¿Estas seguro que quieres eliminar el cliente?',
      text: 'Los datos se perderán permanentemente.',
      showCancelButton: true,
      theme: 'material'
    }).subscribe(resp => {
      if (resp) {
        this.clientService.deleteClient(this.client.uuid).subscribe(
          _ => {
            this.onChange.emit();
          }, ({ error }) => {
            this.swal.fire({
              icon: 'error',
              title: error.message,
              text:
                'Hubo un error al eliminar el cliente. ' +
                'Lamentamos los inconvenientes inténtalo mas tarde.',
              theme: 'material'
            });
          }
        );
      }
    });
  }

  getClientName(): string {
    const { name, surname, motherSurname } = this.client;

    return `${name} ${surname} ${motherSurname}`;
  }

}
