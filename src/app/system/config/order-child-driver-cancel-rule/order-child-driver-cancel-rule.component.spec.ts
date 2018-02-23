import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChildDriverCancelRuleComponent } from './order-child-driver-cancel-rule.component';

describe('OrderChildDriverCancelRuleComponent', () => {
  let component: OrderChildDriverCancelRuleComponent;
  let fixture: ComponentFixture<OrderChildDriverCancelRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChildDriverCancelRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChildDriverCancelRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
