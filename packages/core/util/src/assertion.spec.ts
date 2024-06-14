import { describe, expect, it } from "vitest";

import { func, is, num, obj, str } from "./assertion";

describe("#func", () => {
  it("should check if value is a function", () => {
    expect(func(undefined)).toBe(false);
    expect(func(null)).toBe(false);
    expect(func({})).toBe(false);
    expect(func([])).toBe(false);
    expect(func(() => {})).toBe(true);
  });
});

describe("#is", () => {
  it("should check if value is not undefined and not null", () => {
    expect(is(undefined)).toBe(false);
    expect(is(null)).toBe(false);
    expect(is(0)).toBe(true);
    expect(is("")).toBe(true);
  });
});

describe("#num", () => {
  it("should check if value is a valid number", () => {
    expect(num(undefined)).toBe(false);
    expect(num(null)).toBe(false);
    expect(num("")).toBe(false);
    expect(num("1")).toBe(false);
    expect(num(NaN)).toBe(false);
    expect(num(0)).toBe(true);
    expect(num(1)).toBe(true);
  });
});

describe("#obj", () => {
  it("should check if value is a plain object", () => {
    expect(obj(undefined)).toBe(false);
    expect(obj(null)).toBe(false);
    expect(obj({})).toBe(true);
    expect(obj([])).toBe(false);
  });
});

describe("#str", () => {
  it("should check if value is a non-empty string", () => {
    expect(str(undefined)).toBe(false);
    expect(str(null)).toBe(false);
    expect(str(1)).toBe(false);
    expect(str({})).toBe(false);
    expect(str("")).toBe(false);
    expect(str("1")).toBe(true);
  });
});
