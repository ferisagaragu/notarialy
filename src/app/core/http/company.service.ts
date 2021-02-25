import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CompanyModel } from '../models/company.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends HttpService {

  constructor(public http: HttpClient) {
    super(http);
  }

  findAllCompanies(): Observable<Array<CompanyModel>> {
    return this.http.get(
      `${environment.baseUrl}/companies`,
      { headers: this.headers }
    ).pipe(map((resp: any) => resp.data.map(data => new CompanyModel(data))));
  }

  createCompany(company: CompanyModel): Observable<CompanyModel> {
    return this.http.post(
      `${environment.baseUrl}/companies`,
      company,
      { headers: this.headers }
    ).pipe(map((resp: any) => new CompanyModel(resp.data)))
  }

}
