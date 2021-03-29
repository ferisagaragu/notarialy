import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkModel } from '../../../core/models/work.model';
import { convertMoneyToNumber } from '../../../core/functions/convert-money-to-number';

@Component({
  selector: 'app-form-work',
  templateUrl: './form-work.component.html',
  styleUrls: ['./form-work.component.scss']
})
export class FormWorkComponent implements OnInit, OnChanges {

  @Input() work: WorkModel;
  @Input() disabled: boolean;
  @Output() saveWork: EventEmitter<WorkModel>;
  @Output() removeWork: EventEmitter<void>;

  editable: boolean;
  totalPrice: number;
  form: FormGroup;
  moneyMask: any;
  measures: Array<string>;

  constructor(private formBuilder: FormBuilder) {
    this.saveWork = new EventEmitter<WorkModel>();
    this.removeWork = new EventEmitter<void>();
    this.moneyMask = {alias: 'pesos'};
    this.measures = ['kg', 'g', 'lt', 'ml', 'pz', 'mt', 'mm'];
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled.currentValue) {
      this.form.disable();
    } else {
      this.form?.enable();
    }
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.work = new WorkModel({
      ...this.form.value,
      uuid: this.work.uuid,
      unitPrice: convertMoneyToNumber(
        this.form.value.unitPrice
      ),
      totalPrice:
        this.form.get('quantity').value *
        convertMoneyToNumber(this.form.get('unitPrice').value),
      isNew: false
    });

    this.editable = false;
    this.saveWork.emit(this.work);
  }

  onCancel() {
    if (this.work.isNew) {
      this.removeWork.emit();
    } else {
      this.editable = false;
    }
  }

  private createForm(): void {
    this.totalPrice = this.work.totalPrice;
    this.form = this.formBuilder.group({
      quantity: [
        this.work.quantity,
        Validators.compose([
          Validators.required,
          Validators.min(0)
        ])
      ],
      measure: [this.work.measure, Validators.required],
      concept: [this.work.concept, Validators.required],
      unitPrice: [this.work.unitPrice, Validators.required]
    });

    this.formListeners();
  }

  private formListeners(): void {
    this.form.get('quantity').valueChanges.subscribe(resp => {
      this.totalPrice = resp * convertMoneyToNumber(this.form.get('unitPrice').value);
    });

    this.form.get('unitPrice').valueChanges.subscribe(resp => {
      this.totalPrice = convertMoneyToNumber(resp) * this.form.get('quantity').value;
    });
  }

}
