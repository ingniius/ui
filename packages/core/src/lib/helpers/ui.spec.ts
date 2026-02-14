import { describe, expect, it } from "vitest";

import { resolveOptions, resolveUI } from "./ui";

const adapterOptions = {
  prefix: "V",
  css: {
    strategy: "join" as const,
  },
};

const userOptions = {
  prefix: "U",
  css: {
    variables: false,
  },
};

describe("#resolveOptions", () => {
  it("applies defaults when no arguments are provided", () => {
    const options = resolveOptions();

    expect(options.prefix).toBe("U");
    expect(options.css?.variables).toBe(true);
  });

  it("applies adapter options on top of defaults", () => {
    const options = resolveOptions(adapterOptions);

    expect(options.prefix).toBe("V");
    expect(options.css?.strategy).toBe("join");
  });

  it("applies user options on top of adapter options", () => {
    const options = resolveOptions(adapterOptions, userOptions);

    expect(options.prefix).toBe("U");
    expect(options.css?.strategy).toBe("join");
    expect(options.css?.variables).toBe(false);
  });

  it("preserves typing of nested options", () => {
    const options = resolveOptions({ theme: { preset: "vega" } });

    expect(options.theme?.preset).toBe("vega");
  });
});

describe("#resolveUI", () => {
  it("returns resolved UI object with defaults", () => {
    const result = resolveUI({});

    expect(result).toHaveProperty("colors");
    expect(result).toHaveProperty("components");
    expect(result).toHaveProperty("css");
    expect(result).toHaveProperty("icons");
    expect(result.css).toEqual({ strategy: "merge", prefix: "" });
  });

  it("passes through custom css options", () => {
    const result = resolveUI({ css: { strategy: "join", prefix: "tw" } });

    expect(result.css).toEqual({ strategy: "join", prefix: "tw" });
  });
});
