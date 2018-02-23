import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerBannerComponent } from './owner-banner.component';

describe('OwnerBannerComponent', () => {
  let component: OwnerBannerComponent;
  let fixture: ComponentFixture<OwnerBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
