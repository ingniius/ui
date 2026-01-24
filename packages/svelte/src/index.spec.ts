import { describe, expect, it } from "vitest";

import { isDefined } from "./lib";

describe("#isDefined", () => {
  it("should be defined", () => {
    expect(isDefined).toBeDefined();
  });
});
