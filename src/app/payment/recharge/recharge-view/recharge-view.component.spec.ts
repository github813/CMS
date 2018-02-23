import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeViewComponent } from './recharge-view.component';

describe('RechargeViewComponent', () => {
  let component: RechargeViewComponent;
  let fixture: ComponentFixture<RechargeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
