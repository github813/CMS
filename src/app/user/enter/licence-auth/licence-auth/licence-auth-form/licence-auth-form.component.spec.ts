import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceAuthFormComponent } from './licence-auth-form.component';

describe('LicenceAuthFormComponent', () => {
  let component: LicenceAuthFormComponent;
  let fixture: ComponentFixture<LicenceAuthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceAuthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
