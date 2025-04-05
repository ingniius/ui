import { globbySync } from "globby";
import { defineBuildConfig } from "unbuild";

import { peerDependencies } from "./package.json";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: globbySync(["src/defaults.ts"]),
  externals: [...Object.keys(peerDependencies)].map(pkg => new RegExp(`^${pkg}(/.*)?`)),
});
