import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWarningDeleteComponent } from './popup-warning-delete.component';

describe('PopupWarningDeleteComponentComponent', () => {
  let component: PopupWarningDeleteComponent;
  let fixture: ComponentFixture<PopupWarningDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupWarningDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupWarningDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
