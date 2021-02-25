export class ClientModel {

  uuid: string;
  name: string;
  surname: string
  motherSurname: string;
  address: string;
  phoneNumber: string;

  constructor(data: ClientModel | any) {
    Object.assign(this, data);
  }

}
