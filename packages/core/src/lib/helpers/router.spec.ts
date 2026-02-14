import { describe, expect, it } from "vitest";

import { defineRouter, resolveRouter } from "./router";

describe("#defineRouter", () => {
  const base = "@veehance/react/use-router";

  it("uses meta segment when router is null and segment provided", () => {
    const result = defineRouter(base, null, "next");
    expect(result).toBe(`${base}/next`);
  });

  it("falls back to no suffix when router is null and no segment provided", () => {
    const result = defineRouter(base, null);
    expect(result).toBe(base);
  });

  it("uses inertia segment", () => {
    const result = defineRouter(base, "inertia");
    expect(result).toBe(`${base}/inertia`);
  });

  it("uses tanstack segment", () => {
    const result = defineRouter(base, "tanstack");
    expect(result).toBe(`${base}/tanstack`);
  });

  it("returns base path when router is true", () => {
    const result = defineRouter(base, true);
    expect(result).toBe(base);
  });

  it("uses base segment when router is false", () => {
    const result = defineRouter(base, false);
    expect(result).toBe(`${base}/base`);
  });

  it("uses base segment when router is undefined", () => {
    const result = defineRouter(base, undefined);
    expect(result).toBe(`${base}/base`);
  });
});

describe("#resolveRouter", () => {
  it("returns 'meta' when router is null", () => {
    expect(resolveRouter(null)).toBe("meta");
  });

  it("returns 'inertia' when router is 'inertia'", () => {
    expect(resolveRouter("inertia")).toBe("inertia");
  });

  it("returns 'tanstack' when router is 'tanstack'", () => {
    expect(resolveRouter("tanstack")).toBe("tanstack");
  });

  it("returns 'router' when router is true", () => {
    expect(resolveRouter(true)).toBe("router");
  });

  it("returns 'base' when router is false or undefined", () => {
    expect(resolveRouter(false)).toBe("base");
    expect(resolveRouter(undefined)).toBe("base");
  });
});
