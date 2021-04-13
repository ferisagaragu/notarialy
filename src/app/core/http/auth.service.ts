import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  public onSignIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    super();

    this.onSignIn = new BehaviorSubject(false);
  }

  generateAuthenticationUrl(type: 'Outlook' | 'Google'): Observable<string> {
    return this.http.get(
      `${environment.baseUrl}${
        type === 'Outlook' ?
          '/auth/generate-outlook-authentication-url' :
          '/auth/generate-google-authentication-url'
      }`
    ).pipe(map((resp: any) => resp.data.authUrl))
  }

  signInFormCode(code: string, type: 'Google' | 'Outlook'): Observable<UserModel> {
    return this.http.post(
      `${environment.baseUrl}/auth/sign-in-form-code`,
      { code: decodeURIComponent(code), type }
    ).pipe(map((resp: any) => new UserModel(resp.data)));
  }

}
