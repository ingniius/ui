import { describe, expect, it } from "vitest";

import pkg from "../package.json" with { type: "json" };
import { createProgram } from "./program";

describe("#createProgram", () => {
  it("initializes Commander with the correct name and description", () => {
    const program = createProgram();
    expect(program.name()).toBe("VeehanceUI");
    expect(program.description()).toBe("A visual enhanced design system");
  });

  it("prints version with --version", () => {
    const program = createProgram().exitOverride();

    let output = "";
    const originalWrite = process.stdout.write.bind(process.stdout);
    process.stdout.write = ((str: string) => {
      output += str;
      return true;
    }) as typeof process.stdout.write;

    try {
      program.parse(["node", "cli", "--version"], { from: "user" });
    } catch {
      // Commander throws on exitOverride
    }

    process.stdout.write = originalWrite;
    expect(output).toContain(pkg.version);
  });

  it("prints version with -v", () => {
    const program = createProgram().exitOverride();

    let output = "";
    const originalWrite = process.stdout.write.bind(process.stdout);
    process.stdout.write = ((str: string) => {
      output += str;
      return true;
    }) as typeof process.stdout.write;

    try {
      program.parse(["node", "cli", "-v"], { from: "user" });
    } catch {
      // Commander throws on exitOverride
    }

    process.stdout.write = originalWrite;
    expect(output).toContain(pkg.version);
  });
});
