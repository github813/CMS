import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceAuthComponent } from './licence-auth.component';

describe('LicenceAuthComponent', () => {
  let component: LicenceAuthComponent;
  let fixture: ComponentFixture<LicenceAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
