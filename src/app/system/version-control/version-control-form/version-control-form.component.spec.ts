import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionControlFormComponent } from './version-control-form.component';

describe('VersionControlFormComponent', () => {
  let component: VersionControlFormComponent;
  let fixture: ComponentFixture<VersionControlFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionControlFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionControlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
