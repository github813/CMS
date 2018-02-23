import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateDetailComponent } from './evaluate-detail.component';

describe('EvaluateDetailComponent', () => {
  let component: EvaluateDetailComponent;
  let fixture: ComponentFixture<EvaluateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
