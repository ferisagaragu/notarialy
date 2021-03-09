import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQuoteComponent } from './item-quote.component';

describe('ItemQuoteComponent', () => {
  let component: ItemQuoteComponent;
  let fixture: ComponentFixture<ItemQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
