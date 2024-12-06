import type { PlopTypes } from "@turbo/gen";

import { execSync } from "node:child_process";

interface PackageJson {
  name: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export function createNuxtGenerator(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator("nuxt", {
    description: "Generate a new module for the Workspace",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the module? (You can skip the `@iueev/` prefix)",
      },
      {
        type: "input",
        name: "deps",
        message: "Enter a space separated list of dependencies you would like to install",
      },
    ],
    actions: [
      // SANITIZATION
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@iueev/")) {
            answers.name = answers.name.replace("@iueev/", "");
          }
        }
        return "Config sanitized";
      },
      // TEMPLATES
      {
        type: "add",
        path: "packages/{{ name }}/package.json",
        templateFile: "nuxt/package.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/eslint.config.mjs",
        templateFile: "nuxt/eslint.config.mjs.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/tsconfig.json",
        templateFile: "nuxt/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/nuxt.config.ts",
        templateFile: "nuxt/nuxt.config.ts.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/vitest.config.ts",
        templateFile: "nuxt/vitest.config.ts.hbs",
      },
      // GENERATOR
      {
        type: "add",
        path: "packages/{{ name }}/.npmignore",
        template: `*
!dist/**/*.css
!dist/**/*.cjs
!dist/**/*.js
!dist/**/*.d.ts
!dist/**/*.mjs
!LICENSE
!package.json
!README.md
`,
      },
      {
        type: "add",
        path: "packages/{{ name }}/LICENSE",
        template: `MIT License

Copyright (c) 2023 @ingniius

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,
      },
      {
        type: "add",
        path: "packages/{{ name }}/README.md",
        template: `# \`@iueev/{{ name }}\`

### License

See [LICENSE](./LICENSE) for more information.
`,
      },
      {
        type: "add",
        path: "packages/{{ name }}/src/module.ts",
        template: `import { defineNuxtModule, useLogger } from "@nuxt/kit";

import { name, version } from "../package.json";

export interface ModuleOptions {
  enabled?: boolean;
}

const MODULE_KEY = "{{ name }}" as const;

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: MODULE_KEY,
    compatibility: { nuxt: ">=3.13.0" },
  },
  defaults: {
    enabled: true,
  },
  async setup({ enabled }, _nuxt) {
    const { info } = useLogger(MODULE_KEY);

    if (!enabled) {
      info(\`Skipping \${name} setup, as module is disabled\`);
      return;
    }
  },
});
`,
      },
      // TRANSFORMATIONS
      {
        type: "modify",
        path: "packages/{{ name }}/package.json",
        async transform(content, answers) {
          if ("deps" in answers && typeof answers.deps === "string") {
            const pkg = JSON.parse(content) as PackageJson;
            for (const dep of answers.deps.split(" ").filter(Boolean)) {
              const version = await fetch(`https://registry.npmjs.org/-/package/${dep}/dist-tags`)
                .then((res) => res.json())
                .then((json) => json.latest);
              if (!pkg.dependencies) pkg.dependencies = {};
              pkg.dependencies[dep] = `^${version}`;
            }
            return JSON.stringify(pkg, null, 2);
          }
          return content;
        },
      },
      // EXECUTION
      async (answers) => {
        const { name } = answers as { name: string };
        execSync("pnpm exec manypkg fix", { stdio: "inherit" });
        execSync(`pnpm prettier --write packages/${name}/** --list-different`);
        return "Package scaffolded";
      },
    ],
  });
}
