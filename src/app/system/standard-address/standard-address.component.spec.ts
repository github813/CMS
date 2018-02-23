import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardAddressComponent } from './standard-address.component';

describe('StandardAddressComponent', () => {
  let component: StandardAddressComponent;
  let fixture: ComponentFixture<StandardAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
