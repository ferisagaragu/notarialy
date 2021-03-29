import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  constructor(private http: HttpClient) {
    super();
  }

  updateUser(user: UserModel): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/users`,
      user,
      { headers: this.headers }
    )
  }

}
