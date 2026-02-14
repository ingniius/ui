import { describe, expect, it, vi } from "vitest";

import { iconToSVG } from "./icon";

vi.mock("@iconify/utils", () => ({
  iconToSVG: vi.fn(() => ({
    attributes: { width: "1em", height: "1em" },
    body: "<path />",
  })),
  replaceIDs: vi.fn((body) => body),
}));

vi.mock("#build/ui/icons", () => ({
  icons: {
    lucide: {
      icons: { moon: { body: "<path />" } },
      width: 24,
      height: 24,
    },
    simpleIcons: {
      icons: { github: { body: "<path />" } },
      width: 24,
      height: 24,
    },
  },
}));

describe("#iconToSVG", () => {
  it("renders icon from default collection", () => {
    const result = iconToSVG("lucide:moon");

    expect(result).not.toBeNull();
    expect(result?.attributes.width).toBe("1em");
    expect(result?.body).toBe("<path />");
  });

  it("supports dashed collections via camelCase", () => {
    const result = iconToSVG("simple-icons:github");

    expect(result).not.toBeNull();
    expect(result?.body).toBe("<path />");
  });

  it("returns null if collection does not exist", () => {
    const result = iconToSVG("unknown:moon");

    expect(result).toBeNull();
  });

  it("returns null if icon does not exist", () => {
    const result = iconToSVG("lucide:sun");

    expect(result).toBeNull();
  });

  it("returns null for invalid format", () => {
    const result = iconToSVG("invalid-format");

    expect(result).toBeNull();
  });
});
