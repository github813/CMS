import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNotifyFormComponent } from './system-notify-form.component';

describe('SystemNotifyFormComponent', () => {
  let component: SystemNotifyFormComponent;
  let fixture: ComponentFixture<SystemNotifyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemNotifyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemNotifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
