import { readFileSync } from "node:fs";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { getConfig } from "./config";

vi.mock("node:fs", () => ({ readFileSync: vi.fn() }));

const mockedReadFileSync = vi.mocked(readFileSync);

describe("#getConfig", () => {
  const cwd = "/project";

  beforeEach(() => {
    mockedReadFileSync.mockReset();
  });

  it("returns null when ui.json does not exist", () => {
    const error = new Error("ENOENT");
    (error as NodeJS.ErrnoException).code = "ENOENT";

    mockedReadFileSync.mockImplementationOnce(() => {
      throw error;
    });

    expect(getConfig(cwd)).toBeNull();
  });

  it("throws on invalid JSON", () => {
    mockedReadFileSync.mockReturnValueOnce("{ invalid json");
    expect(() => getConfig(cwd)).toThrow();
  });

  it("throws on invalid schema", () => {
    mockedReadFileSync.mockReturnValueOnce(
      JSON.stringify({ theme: { preset: 123 } }),
    );
    expect(() => getConfig(cwd)).toThrow();
  });
});
