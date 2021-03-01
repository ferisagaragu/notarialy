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

  constructor(data: ClientModel | any) {
    Object.assign(this, data);
  }

}
