import { describe, expect, it } from "vitest";

import { get, omit } from "./lodash";

describe("#get", () => {
  it("should get a value in an object", () => {
    expect(get({ foo: "bar" }, "foo")).toBe("bar");
    expect(get({ foo: "bar" }, "xxx")).toBe(undefined);
    expect(get(["a", "b", "c"], "1")).toBe("b");
    expect(get(["a", "b", "c"], "5")).toBe(undefined);

    const ar: string[] & { foo?: string } = ["a", "b", "c"];
    ar.foo = "bar";

    expect(get(ar, "foo")).toBe("bar");
  });

  it("should get a value in a nested object", () => {
    expect(get({ a: { b: { c: "hello" } } }, "a.b.c")).toBe("hello");
    expect(get({ a: { b: { c: [0, 4, 8] } } }, "a.b.c.2")).toBe(8);
  });
});

describe("#omit", () => {
  it("should omit values", () => {
    expect(omit({ a: "x", b: "y" }, ["b"])).toEqual({ a: "x" });
  });
});
