export class UserModel {

  uuid: string;
  name: string;
  surname: string;
  motherSurname: string;
  phoneNumber: string;
  email: string;

  constructor(data: UserModel | any) {
    Object.assign(this, data);
  }

}
