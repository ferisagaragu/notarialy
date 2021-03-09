import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkModel } from '../../../core/models/work.model';
import { convertMoneyToNumber } from '../../../core/functions/convert-money-to-number';
import { WorkService } from '../../../core/http/work.service';
import { QuoteModel } from '../../../core/models/quote.model';
import { QuoteService } from '../../../core/http/quote.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-work',
  templateUrl: './table-work.component.html',
  styleUrls: ['./table-work.component.scss']
})
export class TableWorkComponent implements OnInit {

  @Input() quote: QuoteModel;

  form: FormGroup;
  workforce: FormControl;
  moneyMask: any;
  works: Array<WorkModel>;
  load: boolean;

  constructor(
    private workService: WorkService,
    private quoteService: QuoteService,
    private snackBar: MatSnackBar
  ) {
    this.moneyMask = { alias: 'pesos' };
    this.works = [];
    this.load = false;
  }

  ngOnInit(): void {
    this.works = this.quote.works;
    this.createInput();
    this.workforce.setValue(this.quote.workforce);
  }

  addElement(): void {
    this.works.push(
      new WorkModel({
        uuid: '',
        quantity: 0,
        concept: '',
        unitPrice: 0,
        totalPrice: 0,
        isNew: true
      })
    );
  }

  saveWork(i: number, event: WorkModel): void {
    this.works[i] = event;
  }

  removeWork(i: number): void {
    this.works.splice(i, 1);
  }

  sumTotal(): number {
    let out = 0;

    this.works.forEach(work => {
      out += work.totalPrice;
    });

    out += convertMoneyToNumber(this.workforce.value);

    return out;
  }

  save(isExport: boolean): void {
    const works = [];
    this.load = true;
    this.workforce.disable();

    this.works.forEach(work => {
      if (work.concept) {
        if (!work.uuid) {
          delete work.uuid;
          works.push(work);
        } else {
          works.push(work);
        }
      }
    });

    this.workService.saveGroupWorks({
      works,
      uuidQuote: this.quote.uuid,
      workforce: convertMoneyToNumber(
        this.workforce.value
      )
    }).subscribe(
      () => {
        if (isExport) {
          this.exportPdf();
        } else {
          this.load = false;
          this.workforce.enable();
        }

        this.snackBar.open(
          '¡Yeeii! Se han guardado los cambios del presupuesto',
          'Ok',
          {
            duration: 5000,
          }
        )
      }, error => {
        console.log(error);
      }
    );
  }

  private exportPdf(): void {
    this.quoteService.generatePdf(this.quote.uuid).subscribe(
      resp => {
        this.load = false;
        this.workforce.enable();
        window.open(URL.createObjectURL(resp));
      }, error => {

      }
    );
  }

  private createInput(): void {
    this.workforce = new FormControl(
      this.quote.workforce,
      Validators.required
    );
  }

}
