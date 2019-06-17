import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FichasPage } from "./record-register.page";

describe("FichasPage", () => {
  let component: FichasPage;
  let fixture: ComponentFixture<FichasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FichasPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
