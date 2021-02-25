import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperQuoteComponent } from './stepper-quote.component';

describe('StepperQuoteComponent', () => {
  let component: StepperQuoteComponent;
  let fixture: ComponentFixture<StepperQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
