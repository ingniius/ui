import { Command } from "commander";

import pkg from "../package.json" with { type: "json" };

export function createProgram() {
  return new Command()
    .name("VeehanceUI")
    .description("A visual enhanced design system")
    .version(pkg.version, "-v, --version", "display the version number");
}
