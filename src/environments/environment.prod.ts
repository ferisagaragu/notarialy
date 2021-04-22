import { EnvironmentInterface } from '../app/core/interfaces/environment.interface';

export const environment: EnvironmentInterface = {
  production: true,
  baseUrl: 'https://notarialy-rest.herokuapp.com/rest',
  googleMapsUrl: 'https://maps.googleapis.com/maps/api/geocode',
  logoIconDefault: 'https://firebasestorage.googleapis.com/v0/b/notarialy-c15cf.appspot.com/o/' +
    'companies%2Fe093e925-fab4-471e-afc4-47646c7e5993.png?alt=media&token=49faca13-050b-4632-bd4d-aa921ad4c544'
};
