import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipownerComponent } from './vipowner.component';

describe('VipownerComponent', () => {
  let component: VipownerComponent;
  let fixture: ComponentFixture<VipownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
