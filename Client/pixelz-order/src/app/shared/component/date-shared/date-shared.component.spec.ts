import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSharedComponent } from './date-shared.component';

describe('DateSharedComponent', () => {
  let component: DateSharedComponent;
  let fixture: ComponentFixture<DateSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
