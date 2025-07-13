import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSharedComponent } from './checkbox-shared.component';

describe('CheckboxSharedComponent', () => {
  let component: CheckboxSharedComponent;
  let fixture: ComponentFixture<CheckboxSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
