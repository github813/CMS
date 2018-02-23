import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementFormComponent } from './settlement-form.component';

describe('SettlementFormComponent', () => {
  let component: SettlementFormComponent;
  let fixture: ComponentFixture<SettlementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
