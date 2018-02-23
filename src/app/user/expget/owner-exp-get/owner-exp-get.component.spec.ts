import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerExpGetComponent } from './owner-exp-get.component';

describe('OwnerExpGetComponent', () => {
  let component: OwnerExpGetComponent;
  let fixture: ComponentFixture<OwnerExpGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerExpGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerExpGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
