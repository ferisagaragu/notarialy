import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWorkComponent } from './form-work.component';

describe('FormWorkComponent', () => {
  let component: FormWorkComponent;
  let fixture: ComponentFixture<FormWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
