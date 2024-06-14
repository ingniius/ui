import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: [
    {
      input: "./src/index.ts",
      format: "esm",
    },
  ],
  externals: ["defu"],
  rollup: {
    emitCJS: true,
  },
});
