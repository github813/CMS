import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerGradeFormComponent } from './owner-grade-form.component';

describe('OwnerGradeFormComponent', () => {
  let component: OwnerGradeFormComponent;
  let fixture: ComponentFixture<OwnerGradeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerGradeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerGradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
