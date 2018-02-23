import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionariesFormComponent } from './dictionaries-form.component';

describe('DictionariesFormComponent', () => {
  let component: DictionariesFormComponent;
  let fixture: ComponentFixture<DictionariesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionariesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionariesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
