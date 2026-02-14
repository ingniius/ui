import type { z } from "zod";

import type {
  adapterKeys,
  baseColorKeys,
  colorKeys,
  configSchema,
  dtsSchema,
  frameworkSchema,
  iconKeys,
  iconsetKeys,
  iconsetSchema,
  presetKeys,
  presetSchema,
  rawConfigSchema,
  routerKeys,
  runtimeKeys,
  sizeKeys,
  strategyKeys,
  strategySchema,
  tailwindSchema,
  themeSchema,
  uiProSchema,
  uiSchema,
} from "../schemas";
import type { Prettify } from "./abstract";

export type Config = Prettify<{
  raw: z.infer<typeof rawConfigSchema>;
  schema: z.infer<typeof configSchema>;
}>;

export type Macro = Prettify<{
  iconset: z.input<typeof iconsetSchema>;
  preset: z.input<typeof presetSchema>;
  strategy: z.input<typeof strategySchema>;
}>;

export type Raw = Prettify<{
  config: z.input<typeof configSchema>;
  schema: z.input<typeof rawConfigSchema>;
}>;

export type Schema = Prettify<{
  framework: z.input<typeof frameworkSchema>;
  dts: z.input<typeof dtsSchema>;
  tailwind: z.input<typeof tailwindSchema>;
  theme: z.input<typeof themeSchema>;
  ui: z.input<typeof uiSchema>;
  uiPro: z.input<typeof uiProSchema>;
}>;

export type Token = Prettify<{
  adapter: z.infer<typeof adapterKeys>;
  baseColor: z.infer<typeof baseColorKeys>;
  color: z.infer<typeof colorKeys>;
  icon: z.infer<typeof iconKeys>;
  iconset: z.infer<typeof iconsetKeys>;
  preset: z.infer<typeof presetKeys>;
  router: z.infer<typeof routerKeys>;
  runtime: z.infer<typeof runtimeKeys>;
  size: z.infer<typeof sizeKeys>;
  strategy: z.infer<typeof strategyKeys>;
}>;
