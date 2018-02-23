import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChildOwnerCancelRuleComponent } from './order-child-owner-cancel-rule.component';

describe('OrderChildOwnerCancelRuleComponent', () => {
  let component: OrderChildOwnerCancelRuleComponent;
  let fixture: ComponentFixture<OrderChildOwnerCancelRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChildOwnerCancelRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChildOwnerCancelRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
