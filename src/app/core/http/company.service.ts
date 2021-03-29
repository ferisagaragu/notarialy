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

  constructor(private http: HttpClient) {
    super();
  }

  findAllCompanies(): Observable<Array<CompanyModel>> {
    return this.http.get(
      `${environment.baseUrl}/companies`,
      { headers: this.headers }
    ).pipe(map((resp: any) => resp.data.map(data => new CompanyModel(data))));
  }

  createCompany(file: File, company: CompanyModel): Observable<CompanyModel> {
    const formData:FormData = new FormData();
    formData.append('body', JSON.stringify(company));
    formData.append('file', file);

    return this.http.post(
      `${environment.baseUrl}/companies`,
      formData,
      { headers: this.headers }
    ).pipe(map((resp: any) => new CompanyModel(resp.data)));
  }

  updateCompany(file: File, company: CompanyModel): Observable<CompanyModel> {
    const formData:FormData = new FormData();
    formData.append('body', JSON.stringify(company));
    formData.append('file', file);

    return this.http.put(
      `${environment.baseUrl}/companies`,
      formData,
      { headers: this.headers }
    ).pipe(map((resp: any) => new CompanyModel(resp.data)));
  }

  deleteCompany(uuid: string): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/companies/${uuid}`,
      { headers: this.headers }
    );
  }

}
