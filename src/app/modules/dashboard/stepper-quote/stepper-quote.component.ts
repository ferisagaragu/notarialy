import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyModel } from '../../../core/models/company.model';

@Component({
  selector: 'app-stepper-quote',
  templateUrl: './stepper-quote.component.html',
  styleUrls: ['./stepper-quote.component.scss']
})
export class StepperQuoteComponent implements OnInit {

  endForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.endForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  saveCompany($event: CompanyModel) {
    console.log($event);
  }

}
