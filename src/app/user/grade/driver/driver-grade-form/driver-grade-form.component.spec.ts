import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverGradeFormComponent } from './driver-grade-form.component';

describe('DriverGradeFormComponent', () => {
  let component: DriverGradeFormComponent;
  let fixture: ComponentFixture<DriverGradeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverGradeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverGradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
