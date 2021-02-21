import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CompanyModel } from '../models/company.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  findAllCompanies(): Observable<Array<CompanyModel>> {
    return this.http.get(`${environment.baseUrl}/companies`)
      .pipe(map((resp: any) => resp.data.map(data => new CompanyModel(data))));
  }

  createCompany(company: CompanyModel): Observable<CompanyModel> {
    return this.http.post(`${environment.baseUrl}/companies`, company)
      .pipe(map((resp: any) => new CompanyModel(resp.data)))
  }

}
