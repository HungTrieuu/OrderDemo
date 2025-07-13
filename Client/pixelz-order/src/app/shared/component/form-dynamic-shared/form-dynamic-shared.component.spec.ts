import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDynamicSharedComponent } from './form-dynamic-shared.component';

describe('FormDynamicSharedComponent', () => {
  let component: FormDynamicSharedComponent;
  let fixture: ComponentFixture<FormDynamicSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDynamicSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDynamicSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
