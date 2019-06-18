import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecordRegisterPage } from "./record-register.page";

describe("FichasPage", () => {
  let component: RecordRegisterPage;
  let fixture: ComponentFixture<RecordRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordRegisterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
