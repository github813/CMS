import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackTraceComponent } from './stack-trace.component';

describe('StackTraceComponent', () => {
  let component: StackTraceComponent;
  let fixture: ComponentFixture<StackTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
