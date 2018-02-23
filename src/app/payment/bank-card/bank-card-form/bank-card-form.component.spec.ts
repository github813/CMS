import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCardFormComponent } from './bank-card-form.component';

describe('BankCardFormComponent', () => {
  let component: BankCardFormComponent;
  let fixture: ComponentFixture<BankCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankCardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
