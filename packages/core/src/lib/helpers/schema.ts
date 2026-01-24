import { cosmiconfig } from "cosmiconfig";
import type { z } from "zod";

import { DEFAULT_OUTPUT, DEFAULT_ROUTER } from "../constants";
import { configSchema, rawConfigSchema } from "../schemas";

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd);
  if (!config) return null;
  return configSchema.parse({
    output: DEFAULT_OUTPUT[config.framework.adapter] ?? "generated",
    css: config.css,
    colorMode: config.framework.features.colorMode,
    fonts: config.framework.features.fonts,
    image: config.framework.features.image,
    locale: config.framework.features.locale,
    router: DEFAULT_ROUTER[config.framework.adapter] ?? false,
    theme: config.theme,
    ui: {
      colors: {
        neutral: config.css?.baseColor,
      },
      components: {
        ...config.preset,
      },
      css: {
        strategy: config.css?.strategy,
        prefix: config.css?.prefix,
        classGroups: config.css?.classGroups,
      },
    },
  });
}

export async function getRawConfig(
  cwd: string,
): Promise<z.infer<typeof rawConfigSchema> | null> {
  const explorer = cosmiconfig("ui", { searchPlaces: ["ui.json"] });
  try {
    const rawConfig = await explorer.search(cwd);
    if (!rawConfig) return null;
    return rawConfigSchema.parse(rawConfig.config);
  } catch (error) {
    const configPath = `${cwd}/ui.json`;
    if (error instanceof Error) throw error;
    throw new Error(`Invalid configuration found in ${configPath}.`);
  }
}
