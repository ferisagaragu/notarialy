export class CompanyModel {

  uuid: string;
  name: string;
  slogan: string;
  title: string;
  logoUrl: string;
  color: string;
  delete: boolean;
  userUuid: string;

  constructor(data: CompanyModel | any) {
    Object.assign(this, data);
  }

}
