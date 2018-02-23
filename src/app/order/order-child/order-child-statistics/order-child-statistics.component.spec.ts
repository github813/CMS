import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChildStatisticsComponent } from './order-child-statistics.component';

describe('OrderChildStatisticsComponent', () => {
  let component: OrderChildStatisticsComponent;
  let fixture: ComponentFixture<OrderChildStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChildStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChildStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
