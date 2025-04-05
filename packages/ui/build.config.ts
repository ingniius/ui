import { globbySync } from "globby";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: globbySync(["src/defaults.ts", "!src/**/*.spec.ts"]),
});
