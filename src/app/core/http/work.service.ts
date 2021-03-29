import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkService extends HttpService {

  constructor(private http: HttpClient) {
    super();
  }

  saveGroupWorks(worsk: any) {
    return this.http.post(
      `${environment.baseUrl}/works/save-group`,
      worsk,
      { headers: this.headers }
    );
  }

}
