import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateOwnerComponent } from './rate-owner.component';

describe('RateOwnerComponent', () => {
  let component: RateOwnerComponent;
  let fixture: ComponentFixture<RateOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
