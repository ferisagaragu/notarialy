export class UserModel {

  uuid: string;
  name: string;
  surname: string;
  motherSurname: string;
  photo: string;
  phoneNumber: string;
  email: string;
  session: any;
  accountType: string;

  constructor(data: UserModel | any) {
    Object.assign(this, data);
  }

}
