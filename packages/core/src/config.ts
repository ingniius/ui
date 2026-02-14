import { readFileSync } from "node:fs";
import { join } from "node:path";

import { defu } from "defu";
import type { z } from "zod";

import { DEFAULT_ROUTER } from "./lib/constants";
import { configSchema, rawConfigSchema } from "./lib/schemas";
import type { Options } from "./lib/types";

export function getConfig(cwd: string) {
  const raw = getRawConfig(cwd);
  if (!raw) return null;

  return configSchema.parse({
    output: raw.cli?.output,
    colorMode: raw.framework.features.colorMode,
    fonts: raw.framework.features.fonts,
    image: raw.framework.features.image,
    locale: raw.framework.features.locale,
    router: DEFAULT_ROUTER[raw.framework.adapter],
    css: raw.css,
    dts: raw.dts,
    theme: raw.theme,
    ui: defu(raw.ui, {
      colors: { neutral: raw.css?.baseColor },
      css: { strategy: raw.css?.strategy, prefix: raw.css?.prefix },
    }),
  }) as Options;
}

export function getRawConfig(
  cwd: string,
): z.infer<typeof rawConfigSchema> | null {
  const configPath = join(cwd, "ui.json");
  try {
    const contents = readFileSync(configPath, "utf8");
    return rawConfigSchema.parse(JSON.parse(contents));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    if (error instanceof Error) throw error;
    throw new Error(`Invalid configuration found in ${configPath}.`);
  }
}
