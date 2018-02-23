import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessNotifyListComponent } from './business-notify-list.component';

describe('BusinessNotifyListComponent', () => {
  let component: BusinessNotifyListComponent;
  let fixture: ComponentFixture<BusinessNotifyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessNotifyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessNotifyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
