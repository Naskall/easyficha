import { TestBed } from "@angular/core/testing";

import { RecordService } from "./Record.service";

describe("RecordService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: RecordService = TestBed.get(RecordService);
    expect(service).toBeTruthy();
  });
});
