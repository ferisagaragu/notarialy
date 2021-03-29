import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
declare var google: any;

@Directive({
  selector: '[appGoogleMapViewer]'
})
export class GoogleMapViewerDirective implements AfterViewInit, OnChanges {

  @Input() lat: number;
  @Input() lng: number;

  private marker: any;
  private map: any;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement;

    this.map = new google.maps.Map(element, {
      center: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: 18,
      draggableCursor: 'default'
    });

    this.marker = new google.maps.Marker({
      position: {
        lat: this.lat,
        lng: this.lng
      },
      map: this.map,
      icon: '../../../assets/svg/map-marker.svg'
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

}
