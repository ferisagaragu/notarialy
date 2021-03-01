import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StepperQuoteComponent } from '../stepper-quote/stepper-quote.component';

@Component({
  selector: 'app-list-quote',
  templateUrl: './list-quote.component.html',
  styleUrls: ['./list-quote.component.scss']
})
export class ListQuoteComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(
      StepperQuoteComponent,
      {
        width: '50%',
        height: '75%',
        disableClose: true
      }
    );
  }

}
