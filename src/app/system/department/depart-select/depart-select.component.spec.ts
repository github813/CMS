import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartSelectComponent } from './depart-select.component';

describe('DepartSelectComponent', () => {
  let component: DepartSelectComponent;
  let fixture: ComponentFixture<DepartSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
