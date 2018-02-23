import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBannerComponent } from './driver-banner.component';

describe('DriverBannerComponent', () => {
  let component: DriverBannerComponent;
  let fixture: ComponentFixture<DriverBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
