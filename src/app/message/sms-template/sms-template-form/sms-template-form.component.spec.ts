import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTemplateFormComponent } from './sms-template-form.component';

describe('SmsTemplateFormComponent', () => {
  let component: SmsTemplateFormComponent;
  let fixture: ComponentFixture<SmsTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
