import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSelectComponent } from './menu-select.component';

describe('MenuSelectComponent', () => {
  let component: MenuSelectComponent;
  let fixture: ComponentFixture<MenuSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
