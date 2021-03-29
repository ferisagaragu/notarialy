import { EnvironmentInterface } from '../app/core/interfaces/environment.interface';

export const environment: EnvironmentInterface = {
  production: true,
  baseUrl: 'http://localhost:5000/rest',
  googleMapsUrl: 'https://maps.googleapis.com/maps/api/geocode',
  logoIconDefault: 'http://10.244.111.222:6060/storages/e11b277c-b2e2-46dd-b75f-8e6778022d3c'
};
