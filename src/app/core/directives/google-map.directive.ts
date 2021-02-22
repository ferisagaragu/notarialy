import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GoogleMapsService } from '../http/google-maps.service';
import { AddressModel } from '../models/address.model';
declare var google: any;

@Directive({
  selector: '[appGoogleMap]'
})
export class GoogleMapDirective implements AfterViewInit, OnChanges {

  @Input() lat: number;
  @Input() lng: number;

  @Output() selectAddress: EventEmitter<AddressModel>;

  private marker: any;
  private map: any;

  constructor(
    private elementRef: ElementRef,
    private googleMapsService: GoogleMapsService
  ) {
    this.selectAddress = new EventEmitter<any>();
  }

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement;

    navigator.geolocation.getCurrentPosition((position) => {
      this.findAddressByLatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      this.map = new google.maps.Map(element, {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 18,
        draggableCursor: 'default'
      });

      this.marker = new google.maps.Marker({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        map: this.map,
        draggable: true,
      });

      google.maps.event.addListener(this.map, 'click',(event) => {
        this.marker.setPosition(event.latLng);
        this.findAddressByLatLng(
          event.latLng.lat(),
          event.latLng.lng()
        );
      });

      google.maps.event.addListener(this.marker, 'dragend', (event) => {
        this.findAddressByLatLng(
          event.latLng.lat(),
          event.latLng.lng()
        );
      });
    });

    element.style.width = '100%';
    element.style.height = '350px';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!(changes['lat'].firstChange && changes['lng'])) {
      this.marker.setPosition({ lat: changes['lat'].currentValue, lng: changes['lng'].currentValue });
      this.map.setCenter({ lat: changes['lat'].currentValue, lng: changes['lng'].currentValue });
    }
  }

  private findAddressByLatLng(lat: number, lng: number): void {
    this.googleMapsService.findAddressByLatLng(lat, lng).subscribe(
      resp => {
        this.selectAddress.emit(new AddressModel(resp.results[0], true));
      }, error => { }
    );
  }

}
