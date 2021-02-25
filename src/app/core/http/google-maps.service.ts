import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private http: HttpClient) { }

  findAddressByLatLng(lat: number, lng: number): Observable<any> {
    return this.http.get(
      `${environment.googleMapsUrl}/json?latlng=${lat},${lng}&key=AIzaSyCGfbafYQgjSAXzZ7ikqOwo7GBtmWZ0hjU`
    );
  }

}
