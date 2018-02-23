import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChildCompensationComponent } from './order-child-compensation.component';

describe('OrderChildCompensationComponent', () => {
  let component: OrderChildCompensationComponent;
  let fixture: ComponentFixture<OrderChildCompensationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChildCompensationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChildCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
