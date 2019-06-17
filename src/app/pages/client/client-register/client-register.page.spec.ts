import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientRegisterPage } from "./client-register.page";

describe("ClientRegisterPage", () => {
  let component: ClientRegisterPage;
  let fixture: ComponentFixture<ClientRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientRegisterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
