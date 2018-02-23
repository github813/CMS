import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCardComponent } from './bank-card.component';

describe('BankCardComponent', () => {
  let component: BankCardComponent;
  let fixture: ComponentFixture<BankCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
