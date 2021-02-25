import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-quote',
  templateUrl: './form-quote.component.html',
  styleUrls: ['./form-quote.component.scss']
})
export class FormQuoteComponent implements OnInit {

  form: FormGroup;
  moneyMask: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.moneyMask = { alias: 'pesos' };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
