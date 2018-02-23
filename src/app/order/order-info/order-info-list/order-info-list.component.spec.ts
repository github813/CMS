import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoListComponent } from './order-info-list.component';

describe('OrderInfoListComponent', () => {
  let component: OrderInfoListComponent;
  let fixture: ComponentFixture<OrderInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
