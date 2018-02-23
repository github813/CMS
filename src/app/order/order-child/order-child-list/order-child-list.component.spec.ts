import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChildListComponent } from './order-child-list.component';

describe('OrderChildListComponent', () => {
  let component: OrderChildListComponent;
  let fixture: ComponentFixture<OrderChildListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderChildListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
