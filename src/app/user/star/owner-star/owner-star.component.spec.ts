import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerStarComponent } from './owner-star.component';

describe('OwnerStarComponent', () => {
  let component: OwnerStarComponent;
  let fixture: ComponentFixture<OwnerStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
