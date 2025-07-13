import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSharedComponent } from './input-shared.component';

describe('InputSharedComponent', () => {
  let component: InputSharedComponent;
  let fixture: ComponentFixture<InputSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
