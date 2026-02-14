import { kebabCase } from "scule";

import { generateCSS, generateTheme } from "./lib/functions";
import type { Options, Stringable, Template } from "./lib/types";
import { container, link, main } from "./theme/ui";

const ui = { container, link, main };

export function getTemplates(
  options: Options,
  inlineConfigs?: (Stringable | undefined)[],
): Template[] {
  const templates: Template[] = [];

  for (const component of Object.keys(ui)) {
    templates.push({
      filename: `theme/${kebabCase(component)}.ts`,
      write: true,
      getContents: () => generateTheme(ui, component, options),
    });
  }

  templates.push({
    filename: "theme/index.ts",
    write: true,
    getContents: () =>
      Object.keys(ui)
        .map(
          (component) =>
            `export { default as ${component} } from './${kebabCase(component)}'`,
        )
        .join("\n"),
  });

  templates.push({
    filename: "ui.css",
    write: true,
    getContents: () => generateCSS(options, inlineConfigs),
  });

  return templates;
}
