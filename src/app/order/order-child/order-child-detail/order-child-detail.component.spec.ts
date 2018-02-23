import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChildDetailComponent } from './order-child-detail.component';

describe('OrderChildDetailComponent', () => {
  let component: OrderChildDetailComponent;
  let fixture: ComponentFixture<OrderChildDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChildDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChildDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
