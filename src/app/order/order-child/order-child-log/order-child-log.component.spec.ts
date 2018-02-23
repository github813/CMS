import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChildLogComponent } from './order-child-log.component';

describe('OrderChildLogComponent', () => {
  let component: OrderChildLogComponent;
  let fixture: ComponentFixture<OrderChildLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChildLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChildLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
