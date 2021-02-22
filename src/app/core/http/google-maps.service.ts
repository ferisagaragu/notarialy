import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private http: HttpClient) { }

  findAddressByLatLng(lat: number, lng: number): Observable<any> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCGfbafYQgjSAXzZ7ikqOwo7GBtmWZ0hjU`)
  }

}
