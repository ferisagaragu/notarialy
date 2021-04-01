import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSignInComponent } from './load-sign-in.component';

describe('LoadSignInComponent', () => {
  let component: LoadSignInComponent;
  let fixture: ComponentFixture<LoadSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
