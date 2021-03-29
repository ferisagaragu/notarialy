import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabQuoteComponent } from './tab-quote.component';

describe('TabQuoteComponent', () => {
  let component: TabQuoteComponent;
  let fixture: ComponentFixture<TabQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
