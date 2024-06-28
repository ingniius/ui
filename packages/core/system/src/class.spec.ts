import { describe, expect, it } from "vitest";

import { cn, cx } from "./class";

describe("#cn", () => {
  it("should return the merged values", () => {
    // eslint-disable-next-line tailwindcss/classnames-order
    expect(cn("px-2 py-1 bg-red hover:bg-dark-red", "p-3 bg-[#B91C1C]")).toBe(
      "hover:bg-dark-red p-3 bg-[#B91C1C]",
    );
  });
});

describe("#cx", () => {
  it("should return the passed values", () => {
    expect(cx({ root: { wrapper: "flex" } }.root.wrapper)).toBe("flex");
  });
});
