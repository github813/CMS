import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNotifyListComponent } from './system-notify-list.component';

describe('SystemNotifyListComponent', () => {
  let component: SystemNotifyListComponent;
  let fixture: ComponentFixture<SystemNotifyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemNotifyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemNotifyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
