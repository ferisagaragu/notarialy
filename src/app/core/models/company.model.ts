export class CompanyModel {

  uuid: string;
  name: string;
  slogan: string;
  title: string;
  logoUrl: string;
  color: string;
  userUuid: string;

  constructor(data: CompanyModel | any) {
    Object.assign(this, data);
  }

}
