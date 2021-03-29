import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CompanyModel } from '../../../core/models/company.model';
import { CompanyService } from '../../../core/http/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Output() saveCompany: EventEmitter<CompanyModel>;

  form: FormGroup;
  companies: Array<CompanyModel>;
  filteredCompanies: Array<CompanyModel>;
  company: CompanyModel;
  companyMessageError: string;
  load: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: CompanyModel
  ) {
    this.saveCompany = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.data) {
      this.update();
      return;
    }

    const companyValue = this.form.get('company').value;

    if (companyValue) {
      this.company = this.companies.find(company => company.name === companyValue);
      this.companyMessageError = null;
      this.saveCompany.emit(this.company);
      this.stepper.next();
      return;
    }

    this.load = true;
    this.form.disable();

    this.companyService.createCompany(
      this.form.value.logoUrl,
      this.form.value
    ).subscribe(
      resp => {
        this.company = resp;
        this.companyMessageError = null;
        this.saveCompany.emit(this.company);
        this.stepper.next();

        this.snackBar.open(
          `Has creado la compañía ${this.company.name},
          si es necesario podrás modificarla desde el menu principal`,
          'Ok',
          {
            duration: 5000,
          }
        );
      }, ({ error }) => {
        this.companyMessageError = error.message;
        this.load = false;
        this.form.enable();
      }
    );
  }

  onSelectCompany(): void {
    if (this.companies.find(item => item.name === this.form.get('company').value)) {
      this.form.get('logoUrl').disable();
      this.form.get('logoUrl').setValue('');
      this.form.get('name').disable();
      this.form.get('name').setValue('');
      this.form.get('slogan').disable();
      this.form.get('slogan').setValue('');
      this.form.get('title').disable();
      this.form.get('title').setValue('');
    } else {
      this.form.get('logoUrl').enable();
      this.form.get('name').enable();
      this.form.get('slogan').enable();
      this.form.get('title').enable();
    }
  }

  close(): void {
    this.dialog.getDialogById('formCompany').close();
  }

  private update(): void {
    this.load = true;
    this.form.disable();

    this.companyService.updateCompany(
      this.form.value.logoUrl,
      {
        uuid: this.data.uuid,
        ...this.form.value
      }
    ).subscribe(
      _ => {
        this.load = false;
        this.form.enable();
        this.dialog.getDialogById('formCompany').close('update');
      }, ({ error }) => {
        this.companyMessageError = error.message;
        this.load = false;
        this.form.enable();
      }
    );
  }

  private createForm(): void {
    if (this.data) {
      const { logoUrl, name, slogan, title } = this.data;

      this.form = this.formBuilder.group({
        logoUrl: [logoUrl],
        name: [name, Validators.required],
        slogan: [slogan, Validators.required],
        title: [title]
      });
    } else {
      this.findAllCompanies();

      this.form = this.formBuilder.group({
        company: [{ value: '', disabled: true }],
        logoUrl: [null],
        name: ['', Validators.required],
        slogan: ['', Validators.required],
        title: ['']
      });

      this.form.get('company').valueChanges.subscribe((resp) => {
        if (resp) {
          this.filteredCompanies = this.companies.filter(
            company => company.name.toLocaleLowerCase().includes(resp.toLocaleLowerCase())
          );
        } else {
          this.filteredCompanies = this.companies;
        }
      });
    }
  }

  private findAllCompanies(): void {
    this.companyService.findAllCompanies().subscribe(
      resp => {
        this.companies = resp;
        this.filteredCompanies = resp;
        this.form.get('company').enable();
      }, ({ error }) => {
        this.dialog.open(
          AlertDialogComponent,
          {
            role: 'alertdialog',
            width: '440px',
            data: { type: 'error', message: error.message }
          }
        );
      }
    );
  }

}
