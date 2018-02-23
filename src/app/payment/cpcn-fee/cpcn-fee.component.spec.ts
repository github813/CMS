import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcnFeeComponent } from './cpcn-fee.component';

describe('CpcnFeeComponent', () => {
  let component: CpcnFeeComponent;
  let fixture: ComponentFixture<CpcnFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpcnFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcnFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
