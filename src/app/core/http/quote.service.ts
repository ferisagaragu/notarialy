import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { QuoteModel } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService extends HttpService {

  constructor(public http: HttpClient) {
    super(http);
  }

  findQuoteByUuid(uuid: string): Observable<QuoteModel> {
    return this.http.get(
      `${environment.baseUrl}/quotes/${uuid}`,
      { headers: this.headers }
    ).pipe(map((resp: any) => new QuoteModel(resp.data)))
  }

  findAllQuotes(): Observable<Array<QuoteModel>> {
    return this.http.get(
      `${environment.baseUrl}/quotes`,
      { headers: this.headers }
    ).pipe(
      map((resp: any) => resp.data.map(data => new QuoteModel(data)))
    );
  }

  createQuote(quote: any): Observable<QuoteModel> {
    return this.http.post(
      `${environment.baseUrl}/quotes`,
      quote,
      { headers: this.headers }
    ).pipe(
      map((resp: any) => new QuoteModel(resp.data))
    );
  }

  generatePdf(quoteUUID: string): Observable<Blob> {
    return this.http.get(
      `${environment.baseUrl}/quotes/generate-pdf/${quoteUUID}`,
      {
        responseType: 'blob',
        headers: this.headers
      }
    )
  }

}