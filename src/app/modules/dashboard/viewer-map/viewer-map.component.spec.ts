import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerMapComponent } from './viewer-map.component';

describe('ViewerMapComponent', () => {
  let component: ViewerMapComponent;
  let fixture: ComponentFixture<ViewerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
