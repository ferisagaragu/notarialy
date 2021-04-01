import { HttpHeaders } from '@angular/common/http';

export class HttpService {

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

}
