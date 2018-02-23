import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopupWindowComponent } from './confirm-popup-window.component';

describe('ConfirmPopupWindowComponent', () => {
  let component: ConfirmPopupWindowComponent;
  let fixture: ComponentFixture<ConfirmPopupWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPopupWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopupWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
