import { describe, expect, it } from "vitest";

import { cn, cva } from "./th";

describe("#cn", () => {
  it("should return the merged values", () => {
    expect(cn("px-2 py-1 bg-red hover:bg-dark-red", "p-3 bg-[#B91C1C]")).toBe(
      "hover:bg-dark-red p-3 bg-[#B91C1C]",
    );
  });
});

describe("#cva", () => {
  it("should return the default values", () => {
    expect(cva({ base: "flex" })()).toBe("flex");
  });
});
