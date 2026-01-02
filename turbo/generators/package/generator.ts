import { execSync } from "node:child_process";

import type { PlopTypes } from "@turbo/gen";

type PackageJson = {
  name: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

export function createPackageGenerator(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator("pkg", {
    description: "Generate a new package",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of the package? (You can skip the `@veehance/` prefix)",
      },
      {
        type: "input",
        name: "path",
        message: "What is the path of the package?",
      },
      {
        type: "input",
        name: "deps",
        message:
          "Enter a space separated list of dependencies you would like to install",
      },
    ],
    actions: [
      (answers) => {
        if (
          "name" in answers &&
          typeof answers.name === "string" &&
          answers.name.startsWith("@veehance/")
        ) {
          answers.name = answers.name.replace("@veehance/", "");
        }
        return "Config sanitized";
      },
      // TEMPLATES
      {
        type: "add",
        path: "{{ path }}/{{ name }}/package.json",
        templateFile: "package/package.json.hbs",
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/tsconfig.json",
        templateFile: "package/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/tsdown.config.ts",
        templateFile: "package/tsdown.config.ts.hbs",
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/vitest.config.ts",
        templateFile: "package/vitest.config.ts.hbs",
      },
      // WRITE
      {
        type: "add",
        path: "{{ path }}/{{ name }}/LICENSE",
        template: `The MIT License (MIT)

Copyright (c) ${new Date().getFullYear()} @ingniius

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
SOFTWARE.`,
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/README.md",
        template: `# \`@veehance/{{ name }}\`

## Installation

\`\`\`shell
pnpm i -D @veehance/{{ name }}
\`\`\`

## License

See [LICENSE](./LICENSE) for more information.`,
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/src/index.ts",
        template: `export function isDefined<T>(value: T | null | undefined): value is T {
	return typeof value !== "undefined" && value !== null;
}
`,
      },
      {
        type: "add",
        path: "{{ path }}/{{ name }}/src/index.spec.ts",
        template: `import { describe, expect, it } from "vitest";

import { isDefined } from ".";

describe("#isDefined", () => {
  it("should be defined", () => {
    expect(isDefined).toBeDefined();
  });
});
`,
      },
      // DEPENDENCIES
      {
        type: "modify",
        path: "{{ path }}/{{ name }}/package.json",
        async transform(content, answers) {
          if ("deps" in answers && typeof answers.deps === "string") {
            const pkg = JSON.parse(content) as PackageJson;
            for (const dep of answers.deps.split(" ").sort().filter(Boolean)) {
              const version = await fetch(
                `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
              )
                .then((res) => res.json())
                .then((json) => json.latest);
              if (!pkg.dependencies) {
                pkg.dependencies = {};
              }
              pkg.dependencies[dep] = `^${version}`;
            }
            return JSON.stringify(pkg, null, 2);
          }
          return content;
        },
      },
      () => {
        execSync("pnpm i", { stdio: "inherit" });
        return "Package scaffolded";
      },
    ],
  });
}
