import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStarComponent } from './driver-star.component';

describe('DriverStarComponent', () => {
  let component: DriverStarComponent;
  let fixture: ComponentFixture<DriverStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
