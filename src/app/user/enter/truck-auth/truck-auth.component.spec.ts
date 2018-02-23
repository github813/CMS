import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckAuthComponent } from './truck-auth.component';

describe('TruckAuthComponent', () => {
  let component: TruckAuthComponent;
  let fixture: ComponentFixture<TruckAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
