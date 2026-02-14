import { z } from "zod";

import { strategyKeys } from "./keys";

export const _strategySchema = z.looseObject({
  prefix: z.string().optional(),
});

export const strategySchema = z.union([
  strategyKeys,
  z.tuple([strategyKeys, _strategySchema]),
]);

export const tailwindSchema = z.object({
  strategy: strategySchema.optional(),
  css: z.string().optional(),
  cssVariables: z.boolean().optional(),
  includes: z.array(z.string()).optional(),
  plugins: z.array(z.string()).optional(),
  sources: z.array(z.string()).optional(),
});
