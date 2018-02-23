import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoDetailComponent } from './order-info-detail.component';

describe('OrderInfoDetailComponent', () => {
  let component: OrderInfoDetailComponent;
  let fixture: ComponentFixture<OrderInfoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInfoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
