import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSharedComponent } from './select-shared.component';

describe('SelectSharedComponent', () => {
  let component: SelectSharedComponent;
  let fixture: ComponentFixture<SelectSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
