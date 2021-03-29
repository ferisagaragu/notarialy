export class ClientModel {

  uuid: string;
  name: string;
  surname: string
  motherSurname: string;
  address: string;
  lat: number;
  lng: number;
  phoneNumber: string;
  color: string;
  delete: boolean;

  constructor(data: ClientModel | any) {
    Object.assign(this, data);
  }

}
