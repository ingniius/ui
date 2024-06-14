import { describe, expect, it } from "vitest";

import { mergeConfig } from "./merge";

describe("#mergeConfig", () => {
  it("should return the merged values", () => {
    expect(
      mergeConfig("merge", { base: "p-4" }, { base: "flex p-6" }),
    ).toStrictEqual({
      base: "flex p-4",
    });
  });

  it("should return the overridden values", () => {
    expect(
      mergeConfig("override", { base: "p-4" }, { base: "flex p-6" }),
    ).toStrictEqual({
      base: "p-4",
    });
  });
});
