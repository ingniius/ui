import { describe, expect, it } from "vitest";

import { resolveUI } from "./ui";

describe("#resolveUI", () => {
  it("returns resolved UI object with defaults", () => {
    const result = resolveUI({}, {}, {});

    expect(result).toHaveProperty("colors");
    expect(result).toHaveProperty("components");
    expect(result).toHaveProperty("css");
    expect(result).toHaveProperty("icons");

    expect(result.css).toEqual({
      strategy: "merge",
      prefix: "",
    });
  });

  it("passes through custom css options", () => {
    const result = resolveUI({ strategy: "join", prefix: "tw" }, {}, {});
    expect(result.css).toEqual({
      strategy: "join",
      prefix: "tw",
    });
  });
});
