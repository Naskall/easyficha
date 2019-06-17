import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsListPage } from './clients-list.page';

describe('ClientsListPage', () => {
  let component: ClientsListPage;
  let fixture: ComponentFixture<ClientsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
