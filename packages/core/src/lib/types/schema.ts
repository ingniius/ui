import type { z } from "zod";

import type {
  baseColorKeySchema,
  colorKeySchema,
  cssSchema,
  dtsSchema,
  iconKeySchema,
  iconsetKeySchema,
  iconsetSchema,
  presetKeySchema,
  presetSchema,
  rawCssSchema,
  rawDtsSchema,
  rawIconsetSchema,
  rawPresetSchema,
  rawUISchema,
  routerKeySchema,
  sizeKeySchema,
  strategyKeySchema,
  uiSchema,
} from "../schemas";
import type { Prettify } from "./abstract";

type Infer<T> = z.infer<T>;

export type Raw = Prettify<{
  css: Infer<typeof rawCssSchema>;
  dts: Infer<typeof rawDtsSchema>;
  iconset: Infer<typeof rawIconsetSchema>;
  preset: Infer<typeof rawPresetSchema>;
  ui: Infer<typeof rawUISchema>;
}>;

export type Schema = Prettify<{
  css: Infer<typeof cssSchema>;
  dts: Infer<typeof dtsSchema>;
  iconset: Infer<typeof iconsetSchema>;
  preset: Infer<typeof presetSchema>;
  ui: Infer<typeof uiSchema>;
}>;

export type Token = {
  baseColor: Infer<typeof baseColorKeySchema>;
  color: Infer<typeof colorKeySchema>;
  icon: Infer<typeof iconKeySchema>;
  iconset: Infer<typeof iconsetKeySchema>;
  preset: Infer<typeof presetKeySchema>;
  router: Infer<typeof routerKeySchema>;
  strategy: Infer<typeof strategyKeySchema>;
  size: Infer<typeof sizeKeySchema>;
};
