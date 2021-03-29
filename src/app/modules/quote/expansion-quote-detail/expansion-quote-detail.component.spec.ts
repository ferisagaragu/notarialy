import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionQuoteDetailComponent } from './expansion-quote-detail.component';

describe('ExpansionQuoteDetailComponent', () => {
  let component: ExpansionQuoteDetailComponent;
  let fixture: ComponentFixture<ExpansionQuoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionQuoteDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionQuoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
