import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSyncComponent } from './order-sync.component';

describe('OrderSyncComponent', () => {
  let component: OrderSyncComponent;
  let fixture: ComponentFixture<OrderSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
