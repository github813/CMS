import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInsuranceFeeRuleComponent } from './order-insurance-fee-rule.component';

describe('OrderInsuranceFeeRuleComponent', () => {
  let component: OrderInsuranceFeeRuleComponent;
  let fixture: ComponentFixture<OrderInsuranceFeeRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInsuranceFeeRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInsuranceFeeRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
