import { describe, expect, it } from "vitest";

import { isDefined, isNumber, isObject, isString } from "../../src/runtime/utils/assertion";

describe("#isDefined", () => {
  it("should check if value is not undefined and not null", () => {
    expect(isDefined(undefined)).toBe(false);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(0)).toBe(true);
    expect(isDefined("")).toBe(true);
  });
});

describe("#isNumber", () => {
  it("should check if value is a valid number", () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber("")).toBe(false);
    expect(isNumber("1")).toBe(false);
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
  });
});

describe("#isObject", () => {
  it("should check if value is a plain object", () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
  });
});

describe("#isString", () => {
  it("should check if value is a non-empty string", () => {
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString("")).toBe(false);
    expect(isString("1")).toBe(true);
  });
});
