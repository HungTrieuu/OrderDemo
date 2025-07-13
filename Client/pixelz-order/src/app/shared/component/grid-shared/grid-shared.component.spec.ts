import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSharedComponent } from './grid-shared.component';

describe('GridSharedComponent', () => {
  let component: GridSharedComponent;
  let fixture: ComponentFixture<GridSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
