import { describe, expect, it } from "vitest";

import { resolveConfig, resolveUI } from "./ui";

const adapterConfig = {
  dts: { prefix: "V" },
  tailwind: { strategy: "join" as const },
};

const userConfig = {
  dts: { prefix: "U" },
  tailwind: { cssVariables: false },
};

describe("#resolveConfig", () => {
  it("applies defaults when no arguments are provided", () => {
    const config = resolveConfig();

    expect(config.dts?.prefix).toBe("U");
    expect(config.tailwind?.cssVariables).toBe(true);
  });

  it("applies adapter config on top of defaults", () => {
    const config = resolveConfig(adapterConfig);

    expect(config.dts?.prefix).toBe("V");
    expect(config.tailwind?.strategy).toBe("join");
  });

  it("applies user config on top of adapter config", () => {
    const config = resolveConfig(adapterConfig, userConfig);

    expect(config.dts?.prefix).toBe("U");
    expect(config.tailwind?.strategy).toBe("join");
    expect(config.tailwind?.cssVariables).toBe(false);
  });

  it("preserves typing of nested config", () => {
    const config = resolveConfig({ theme: { preset: "vega" } });
    expect(config.theme?.preset).toBe("vega");
  });
});

describe("#resolveUI", () => {
  it("returns resolved UI object with defaults", () => {
    const result = resolveUI({});

    expect(result).toHaveProperty("colors");
    expect(result).toHaveProperty("components");
    expect(result).toHaveProperty("icons");
    expect(result).toHaveProperty("tw");
    expect(result.tw).toEqual({ merge: true, options: { prefix: "" } });
  });

  it("passes through custom tailwind config", () => {
    const result = resolveUI({
      tailwind: { strategy: ["join", { prefix: "tw" }] },
    });
    expect(result.tw).toEqual({ merge: false, options: { prefix: "tw" } });
  });
});
