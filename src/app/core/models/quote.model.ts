import { ClientModel } from './client.model';
import { CompanyModel } from './company.model';
import { UserModel } from './user.model';
import { WorkModel } from './work.model';

export class QuoteModel {

  uuid: string;
  createDate: string;
  workforce: number;
  color: string;
  user: UserModel;
  client: ClientModel;
  company: CompanyModel;
  works: Array<WorkModel>;

  constructor(data: QuoteModel | any) {
    Object.assign(this, data);
  }

}
