import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTradeComponent } from './order-trade.component';

describe('OrderTradeComponent', () => {
  let component: OrderTradeComponent;
  let fixture: ComponentFixture<OrderTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
