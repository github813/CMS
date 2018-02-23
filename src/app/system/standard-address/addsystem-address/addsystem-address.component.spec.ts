import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsystemAddressComponent } from './addsystem-address.component';

describe('AddsystemAddressComponent', () => {
  let component: AddsystemAddressComponent;
  let fixture: ComponentFixture<AddsystemAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsystemAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsystemAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
