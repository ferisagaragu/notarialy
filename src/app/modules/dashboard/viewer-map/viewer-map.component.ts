import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VIEWER_MAP_DIALOG } from '../../../core/constant/dialog-ids.constant';

@Component({
  selector: 'app-viewer-map',
  templateUrl: './viewer-map.component.html',
  styleUrls: ['./viewer-map.component.scss']
})
export class ViewerMapComponent implements OnInit {

  lat: number;
  lng: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { lat: number, lng: number },
    private dialog: MatDialog
  ) {
    this.lat = this.data.lat;
    this.lng = this.data.lng;
  }

  ngOnInit(): void {

  }

  onClose(): void {
    this.dialog.getDialogById(VIEWER_MAP_DIALOG).close();
  }

}
