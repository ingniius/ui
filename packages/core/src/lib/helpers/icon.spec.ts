import { describe, expect, it } from "vitest";

import { ICONSET_MAP } from "../constants";
import { defineIcons } from "./icon";

describe("#defineIcons", () => {
  it.each([
    ["heroicons-outline", ICONSET_MAP["heroicons-outline"]],
    ["heroicons-solid", ICONSET_MAP["heroicons-solid"]],
    ["hugeicons", ICONSET_MAP.hugeicons],
    ["phosphor", ICONSET_MAP.phosphor],
    ["tabler", ICONSET_MAP.tabler],
  ] as const)("resolves %s iconset", (name, icons) => {
    expect(defineIcons(name)).toMatchObject(icons);
  });

  it("defaults to lucide when no iconset is provided", () => {
    expect(defineIcons()).toMatchObject(ICONSET_MAP.lucide);
  });
});
