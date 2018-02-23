import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverExpGetComponent } from './driver-exp-get.component';

describe('DriverExpGetComponent', () => {
  let component: DriverExpGetComponent;
  let fixture: ComponentFixture<DriverExpGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverExpGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverExpGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
