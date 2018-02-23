import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPopupWindowComponent } from './result-popup-window.component';

describe('ResultPopupWindowComponent', () => {
  let component: ResultPopupWindowComponent;
  let fixture: ComponentFixture<ResultPopupWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPopupWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPopupWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
