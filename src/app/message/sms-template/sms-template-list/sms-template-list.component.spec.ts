import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTemplateListComponent } from './sms-template-list.component';

describe('SmsTemplateListComponent', () => {
  let component: SmsTemplateListComponent;
  let fixture: ComponentFixture<SmsTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
