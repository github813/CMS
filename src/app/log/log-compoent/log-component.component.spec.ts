import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogComponentComponent } from './log-component.component';

describe('LogComponentComponent', () => {
  let component: LogComponentComponent;
  let fixture: ComponentFixture<LogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
