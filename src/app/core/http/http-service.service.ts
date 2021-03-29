import { HttpHeaders } from '@angular/common/http';

export class HttpService {

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
  }

  private getToken(): string {
    return sessionStorage.getItem('token');
  }

}
