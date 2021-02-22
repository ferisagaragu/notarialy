import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../core/http/company.service';
import { CompanyModel } from '../../../core/models/company.model';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AddressModel } from '../../../core/models/address.model';

@Component({
  selector: 'app-form-quote',
  templateUrl: './form-quote.component.html',
  styleUrls: ['./form-quote.component.scss']
})
export class FormQuoteComponent implements OnInit {

  companyForm: FormGroup;
  companies: Array<CompanyModel>;
  filteredCompanies: Array<CompanyModel>;
  company: CompanyModel;
  companyMessageError: string;

  secondFormGroup: FormGroup;
  lat: number = 20.45964317435236;
  lng: number = -103.5070986126892;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.findAllCompanies();
    this.createCompanyForm();

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onSelectCompany() {
    if (this.companies.find(item => item.name === this.companyForm.get('company').value)) {
      this.companyForm.get('logoUrl').disable();
      this.companyForm.get('logoUrl').setValue('');
      this.companyForm.get('name').disable();
      this.companyForm.get('name').setValue('');
      this.companyForm.get('slogan').disable();
      this.companyForm.get('slogan').setValue('');
      this.companyForm.get('title').disable();
      this.companyForm.get('title').setValue('');
    } else {
      this.companyForm.get('logoUrl').enable();
      this.companyForm.get('name').enable();
      this.companyForm.get('slogan').enable();
      this.companyForm.get('title').enable();
    }
  }

  companySave(stepper: MatVerticalStepper) {
    if (this.companyForm.invalid) {
      return;
    }

    const companyValue = this.companyForm.get('company').value;

    if (companyValue) {
      this.company = this.companies.find(company => company.name === companyValue);
      this.companyMessageError = null;
      console.log(this.company);
      stepper.next();
      return;
    }

    this.companyService.createCompany(this.companyForm.value).subscribe(
      resp => {
        this.company = resp;
        this.companyMessageError = null;
        console.log(this.company);
        stepper.next();

        this.snackBar.open(
          `Has creado la compañía ${this.company.name},
          si es necesario podrás modificarla desde el menu principal`,
          'Ok',
          {
            duration: 4000,
          }
        );
      }, ({ error }) => {
        this.companyMessageError = error.message;
      }
    );
  }

  private findAllCompanies(): void {
    this.companyService.findAllCompanies().subscribe(
      resp => {
        this.companies = resp;
        this.filteredCompanies = resp;
      }, () => { }
    )
  }

  private createCompanyForm() {
    this.companyForm = this.formBuilder.group({
      company: [''],
      logoUrl: [''],
      name: ['', Validators.required],
      slogan: ['', Validators.required],
      title: ['']
    });

    this.companyForm.get('company').valueChanges.subscribe((resp) => {
      if (resp) {
        this.filteredCompanies = this.companies.filter(
          company => company.name.toLocaleLowerCase().includes(resp.toLocaleLowerCase())
        );
      } else {
        this.filteredCompanies = this.companies;
      }
    });
  }

  printAddress($event: AddressModel) {
    this.lat = $event.lat;
    this.lng = $event.lng;
    this.secondFormGroup.get('secondCtrl').setValue($event.formatted)
  }

  setAddressText($event: AddressModel) {
    this.secondFormGroup.get('secondCtrl').setValue($event.formatted)
  }

}
