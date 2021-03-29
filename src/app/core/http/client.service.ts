import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends HttpService {

  constructor(private http: HttpClient) {
    super();
  }

  findAllClients(): Observable<Array<ClientModel>> {
    return this.http.get(
      `${environment.baseUrl}/clients`,
      { headers: this.headers }
    ).pipe(map((resp: any) => resp.data.map(data => new ClientModel(data))));
  }

  createClient(client: ClientModel): Observable<ClientModel> {
    return this.http.post(
      `${environment.baseUrl}/clients`,
      client,
      { headers: this.headers }
    ).pipe(map((resp: any) => new ClientModel(resp.data)));
  }

  updateClient(client: ClientModel): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/clients`,
      client,
      { headers: this.headers }
    );
  }

  deleteClient(uuid: string): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/clients/${uuid}`,
      { headers: this.headers }
    );
  }

}
