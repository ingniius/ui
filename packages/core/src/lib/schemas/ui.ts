import { z } from "zod";

import { ACCENT_KEYS, SHADE_KEYS } from "../constants";
import type { Dict } from "../types";
import { baseColorKeys } from "./keys";
import { _strategySchema } from "./tailwind";
import { _iconsetSchema, _presetSchema } from "./theme";

const shadeSchema = z.object(
  Object.fromEntries(SHADE_KEYS.map((key) => [key, z.string()])) as Dict<
    (typeof SHADE_KEYS)[number],
    z.ZodString
  >,
);

const accentSchema = z.union([z.enum(ACCENT_KEYS), z.string(), shadeSchema]);

const colorSchema = z
  .object({ neutral: baseColorKeys.optional() })
  .catchall(accentSchema);

const twSchema = z.object({
  merge: z.boolean().optional(),
  options: _strategySchema.optional(),
});

export const uiSchema = z.object({
  colors: colorSchema.optional(),
  components: _presetSchema.optional(),
  icons: _iconsetSchema.optional(),
  tw: twSchema.optional(),
});

export const uiProSchema = z.object({
  auth: z.boolean().optional(),
  chat: z.boolean().optional(),
  content: z.boolean().optional(),
  dashboard: z.boolean().optional(),
  page: z.boolean().optional(),
  post: z.boolean().optional(),
});
