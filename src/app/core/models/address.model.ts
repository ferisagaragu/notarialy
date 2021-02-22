export class AddressModel {

  lat: number;
  lng: number;
  number: string;
  street: string;
  suburb: string;
  city: string;
  municipality: string;
  country: string;
  postalCode: string;
  formatted: string;

  constructor(place: any, map: boolean = false) {
    console.log(place)
    let addressOut: any = { };

    if (map){
      addressOut.lat = place.geometry.location.lat;
      addressOut.lng = place.geometry.location.lng;
    } else {
      addressOut.lat = place.geometry.location.lat();
      addressOut.lng = place.geometry.location.lng();
    }

    addressOut.formatted = place.formatted_address;

    place.address_components.forEach(address => {
      if (address.types[0] === 'street_number') {
        addressOut.number = address.long_name;
      }

      if (address.types[0] === 'route') {
        addressOut.street = address.long_name;
      }

      if (address.types[0] === 'sublocality_level_1') {
        addressOut.suburb = address.long_name;
      }

      if (address.types[0] === 'locality') {
        addressOut.city = address.long_name;
      }

      if (address.types[0] === 'administrative_area_level_1') {
        addressOut.municipality = address.long_name;
      }

      if (address.types[0] === 'country') {
        addressOut.country = address.long_name;
      }

      if (address.types[0] === 'postal_code') {
        addressOut.postalCode = address.long_name;
      }
    });

    Object.assign(this, addressOut);
  }

}
