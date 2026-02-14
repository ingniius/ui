import { z } from "zod";

import { dtsSchema } from "./dts";
import { featuresSchema, frameworkSchema } from "./framework";
import { routerKeys } from "./keys";
import { tailwindSchema } from "./tailwind";
import { themeSchema } from "./theme";
import { uiProSchema, uiSchema } from "./ui";

export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  framework: frameworkSchema,
  dts: dtsSchema.optional(),
  tailwind: tailwindSchema.optional(),
  theme: themeSchema.optional(),
  ui: uiSchema.pick(["colors", "components", "icons"]).optional(),
  uiPro: uiProSchema.optional(),
});

const routerSchema = z.union([routerKeys, z.union([z.boolean(), z.null()])]);

export const configSchema = featuresSchema.extend({
  dts: dtsSchema.optional(),
  router: routerSchema.optional(),
  tailwind: tailwindSchema.optional(),
  theme: themeSchema.optional(),
  ui: uiSchema.optional(),
  uiPro: uiProSchema.optional(),
});
