import { Command } from "commander";

import pkg from "../package.json" with { type: "json" };

export function createProgram() {
  return new Command()
    .name("veehance")
    .description("add resources to your project")
    .version(pkg.version, "-v, --version", "display the version number");
}
