import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementViewComponent } from './settlement-view.component';

describe('SettlementViewComponent', () => {
  let component: SettlementViewComponent;
  let fixture: ComponentFixture<SettlementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
