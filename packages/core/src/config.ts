import { readFileSync } from "node:fs";
import { join } from "node:path";

import { resolveRawConfig } from "./lib/helpers";
import { configSchema, rawConfigSchema } from "./lib/schemas";
import type { Config } from "./lib/types";

export function getConfig(cwd: string): Config["schema"] | null {
  const raw = getRawConfig(cwd);
  if (!raw) return null;
  return configSchema.parse(resolveRawConfig(raw));
}

export function getRawConfig(cwd: string): Config["raw"] | null {
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
