import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDataPage } from './all-data.page';

describe('AllDataPage', () => {
  let component: AllDataPage;
  let fixture: ComponentFixture<AllDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
