export class WorkModel {

  uuid: string;
  quantity: number;
  measure: 'kg' | 'g' | 'lt' | 'ml' | 'pz' | 'mt' | 'mm';
  concept: string;
  unitPrice: number;
  totalPrice: number;
  isNew: boolean;

  constructor(data: WorkModel | any) {
    this.measure = 'pz';

    Object.assign(this, data);
  }

}
