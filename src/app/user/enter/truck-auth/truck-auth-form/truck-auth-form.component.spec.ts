import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckAuthFormComponent } from './truck-auth-form.component';

describe('TruckAuthFormComponent', () => {
  let component: TruckAuthFormComponent;
  let fixture: ComponentFixture<TruckAuthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckAuthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
