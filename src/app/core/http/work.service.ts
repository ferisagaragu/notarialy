import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkService extends HttpService {

  constructor(public http: HttpClient) {
    super(http);
  }

  saveGroupWorks(worsk: any) {
    return this.http.post(
      `${environment.baseUrl}/works`,
      worsk,
      { headers: this.headers }
    );
  }

}
