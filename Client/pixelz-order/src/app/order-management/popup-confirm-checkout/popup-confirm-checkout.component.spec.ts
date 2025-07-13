import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmCheckoutComponent } from './popup-confirm-checkout.component';

describe('PopupConfirmCheckoutComponent', () => {
  let component: PopupConfirmCheckoutComponent;
  let fixture: ComponentFixture<PopupConfirmCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupConfirmCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupConfirmCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
