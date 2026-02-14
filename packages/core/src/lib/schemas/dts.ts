import { isString } from "radash";
import { z } from "zod";

const _dtsSchema = z.object({
  output: z.object({
    appConfig: z.string().optional(),
    css: z.string().optional(),
    theme: z.string().optional(),
    ui: z.string().optional(),
  }),
  prefix: z.object({
    auth: z.string().optional(),
    chat: z.string().optional(),
    colorMode: z.string().optional(),
    content: z.string().optional(),
    dashboard: z.string().optional(),
    page: z.string().optional(),
    post: z.string().optional(),
    prose: z.string().optional(),
    ui: z.string().optional(),
  }),
});

export const dtsSchema = z
  .union([
    z.object({
      output: z.string().optional(),
      prefix: z.string().optional(),
    }),
    _dtsSchema.partial().extend({
      output: z.union([z.string(), _dtsSchema.shape.output]).optional(),
      prefix: z.union([z.string(), _dtsSchema.shape.prefix]).optional(),
    }),
  ])
  .transform((value): z.infer<typeof _dtsSchema> => {
    const output = isString(value.output)
      ? deriveOutputs(value.output)
      : (value.output ?? {});

    const prefix = isString(value.prefix)
      ? derivePrefixes(value.prefix)
      : (value.prefix ?? {});

    return { output, prefix };
  })
  .pipe(_dtsSchema);

function deriveOutputs(base: string) {
  const clean = base.replace(/\/$/, "");
  return {
    appConfig: `${clean}/app.config.mjs`,
    css: `${clean}/ui.css`,
    theme: `${clean}/theme`,
    ui: `${clean}/ui`,
  };
}

function derivePrefixes(base: string) {
  return {
    auth: `${base}Auth`,
    chat: `${base}Chat`,
    colorMode: `${base}ColorMode`,
    content: `${base}Content`,
    dashboard: `${base}Dashboard`,
    page: `${base}Page`,
    post: `${base}Post`,
    prose: `${base}Prose`,
    ui: base,
  };
}
