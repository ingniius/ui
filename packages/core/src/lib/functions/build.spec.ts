import { describe, expect, it } from "vitest";

import { generateAppConfig, generateAppConfigUI } from "./build";

describe("generateAppConfig", () => {
  it("generates a default export with colorMode and ui", () => {
    const result = generateAppConfig(
      { components: { container: { base: "" } } },
      { colorMode: true },
    );

    expect(result).toContain("export default");
    expect(result).toContain('"colorMode": true');
    expect(result).toContain('"ui":');
    expect(result).toContain('"container"');
  });
});

describe("generateAppConfigUI", () => {
  it("generates UI interface with color and icon unions", () => {
    const result = generateAppConfigUI(
      { icons: { check: "", close: "" } },
      { theme: { colors: ["primary", "secondary"] } },
    );

    expect(result).toContain("interface AppConfigUI");
    expect(result).toContain("typeof ui");
    expect(result).toContain('"primary" | "secondary"');
    expect(result).toContain('"check" | "close"');
  });
});
