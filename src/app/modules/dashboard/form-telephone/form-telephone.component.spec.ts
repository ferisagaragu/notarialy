import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTelephoneComponent } from './form-telephone.component';

describe('FormTelephoneComponent', () => {
  let component: FormTelephoneComponent;
  let fixture: ComponentFixture<FormTelephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTelephoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTelephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
