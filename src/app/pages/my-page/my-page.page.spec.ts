import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPagePage } from './my-page.page';

describe('MyPagePage', () => {
  let component: MyPagePage;
  let fixture: ComponentFixture<MyPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
