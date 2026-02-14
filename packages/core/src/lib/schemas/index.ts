import { isString } from "radash";
import { z } from "zod";

import {
  COMMON_ADAPTERS,
  CUSTOM_ADAPTERS,
  DEFAULT_FEATURES,
  DEFAULT_OUTPUT,
  DEFAULT_PREFIX,
} from "../constants";

/* -------------------------------------------------------------------------- */
/* tokens                                                                     */
/* -------------------------------------------------------------------------- */

const triState = z.union([z.boolean(), z.null()]);

export const baseColorKeySchema = z.enum([
  "gray",
  "neutral",
  "slate",
  "stone",
  "zinc",
]);

export const colorKeySchema = z.enum([
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
]);

export const iconKeySchema = z.enum([
  "alert",
  "dark",
  "light",
  "system",
  "user",
]);

export const iconsetKeySchema = z.enum([
  "heroicons-outline",
  "heroicons-solid",
  "hugeicons",
  "lucide",
  "phosphor",
  "tabler",
]);

export const presetKeySchema = z.enum(["lyra", "maia", "mira", "nova", "vega"]);

export const routerKeySchema = z.enum(["inertia", "tanstack"]);

export const sizeKeySchema = z.enum(["xs", "sm", "md", "lg", "xl"]);

export const strategyKeySchema = z.enum(["join", "merge"]);

/* -------------------------------------------------------------------------- */
/* framework                                                                  */
/* -------------------------------------------------------------------------- */

export const adapterKeySchema = z.enum([
  ...COMMON_ADAPTERS,
  ...CUSTOM_ADAPTERS.react,
  ...CUSTOM_ADAPTERS.vue,
] as const);

const platformKeySchema = z.enum(["react", "vue"]);

const frameworkNameSchema = z.custom<
  | `${"react" | "vue"}:${(typeof COMMON_ADAPTERS)[number]}`
  | `react:${(typeof CUSTOM_ADAPTERS)["react"][number]}`
  | `vue:${(typeof CUSTOM_ADAPTERS)["vue"][number]}`
>((value) => {
  if (!isString(value) || !value.includes(":")) return false;
  const [platform, adapter] = value.split(":") as [string, string];

  const platformResult = platformKeySchema.safeParse(platform);
  if (!platformResult.success) return false;
  const validPlatform = platformResult.data;

  const adapterResult = adapterKeySchema.safeParse(adapter);
  if (!adapterResult.success) return false;
  const validAdapter = adapterResult.data;

  const defaultAdapters = COMMON_ADAPTERS;
  if ((defaultAdapters as readonly string[]).includes(validAdapter))
    return true;

  const customAdapters = CUSTOM_ADAPTERS[validPlatform];
  if (!customAdapters) return false;
  return (customAdapters as readonly string[]).includes(validAdapter);
});

const frameworkOptionsSchema = z.object({
  colorMode: z.boolean(),
  fonts: triState,
  image: triState,
  locale: z.boolean(),
});

const rawFrameworkSchema = z.object({
  platform: platformKeySchema,
  adapter: adapterKeySchema,
  features: frameworkOptionsSchema,
});

const frameworkSchema = z
  .union([
    frameworkNameSchema,
    z.tuple([frameworkNameSchema, frameworkOptionsSchema.partial()]),
  ])
  .transform((value): z.infer<typeof rawFrameworkSchema> => {
    const [name, userFeatures] = isString(value) ? [value, undefined] : value;
    const [platform, adapter] = name.split(":") as [
      z.infer<typeof platformKeySchema>,
      z.infer<typeof adapterKeySchema>,
    ];

    return {
      platform,
      adapter,
      features: mergeFeatures(adapter, userFeatures),
    };
  })
  .pipe(rawFrameworkSchema);

/* -------------------------------------------------------------------------- */
/* cli                                                                        */
/* -------------------------------------------------------------------------- */

const cliSchema = z.object({
  output: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/* css                                                                        */
/* -------------------------------------------------------------------------- */

export const rawCssSchema = z.object({
  strategy: strategyKeySchema.optional(),
  prefix: z.string().optional(),
});

export const cssSchema = rawCssSchema.extend({
  baseColor: baseColorKeySchema.optional(),
  sources: z.array(z.string()).optional(),
  plugins: z.array(z.string()).optional(),
  variables: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/* dts                                                                        */
/* -------------------------------------------------------------------------- */

const dtsOptionsSchema = z.object({
  dirs: z.array(z.string()).optional(),
});

export const rawDtsSchema = z.object({
  autoImports: dtsOptionsSchema.optional(),
  components: dtsOptionsSchema.optional(),
});

export const dtsSchema = z.union([z.literal(false), rawDtsSchema]);

/* -------------------------------------------------------------------------- */
/* iconset                                                                    */
/* -------------------------------------------------------------------------- */

export const rawIconsetSchema = z
  .record(z.union([iconKeySchema, z.string()]), z.string())
  .optional();

export const iconsetSchema = z.union([
  iconsetKeySchema,
  z.tuple([iconsetKeySchema, rawIconsetSchema]),
]);

/* -------------------------------------------------------------------------- */
/* preset                                                                     */
/* -------------------------------------------------------------------------- */

export const rawPresetSchema = z
  .looseObject({ icon: z.looseObject({ dynamic: z.boolean() }).optional() })
  .optional();

export const presetSchema = z.union([
  presetKeySchema,
  z.tuple([presetKeySchema, rawPresetSchema]),
]);

/* -------------------------------------------------------------------------- */
/* theme                                                                      */
/* -------------------------------------------------------------------------- */

export const themeSchema = z.object({
  defaultVariants: z
    .object({
      color: z.union([colorKeySchema, z.string()]).optional(),
      size: sizeKeySchema.optional(),
    })
    .optional(),
  colors: z.array(z.string()).optional(),
  iconset: iconsetSchema.optional(),
  preset: presetSchema.optional(),
  transitions: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/* ui                                                                         */
/* -------------------------------------------------------------------------- */

export const rawUISchema = z.object({
  colors: z
    .looseObject({
      neutral: z.union([baseColorKeySchema, z.string()]).optional(),
    })
    .optional(),
  components: rawPresetSchema.optional(),
  icons: rawIconsetSchema.optional(),
});

export const uiSchema = rawUISchema.extend({
  css: rawCssSchema.optional(),
});

/* -------------------------------------------------------------------------- */
/* config                                                                     */
/* -------------------------------------------------------------------------- */

export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  framework: frameworkSchema,
  cli: cliSchema.optional(),
  css: cssSchema.optional(),
  dts: dtsSchema.optional(),
  theme: themeSchema.optional(),
  ui: rawUISchema.optional(),
});

export const configSchema = frameworkOptionsSchema.extend({
  output: z.string().default(DEFAULT_OUTPUT),
  prefix: z.string().default(DEFAULT_PREFIX),
  router: z.union([triState, routerKeySchema]).default(false),
  css: cssSchema.optional(),
  dts: dtsSchema.optional(),
  theme: themeSchema.optional(),
  ui: uiSchema.optional(),
});

/* -------------------------------------------------------------------------- */
/* helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getDefaultFeaturesForAdapter(
  adapter: z.infer<typeof adapterKeySchema>,
) {
  const hasCustomImplementation = adapter === "next" || adapter === "nuxt";
  return {
    colorMode: DEFAULT_FEATURES.colorMode,
    fonts: hasCustomImplementation ? null : DEFAULT_FEATURES.fonts,
    image: hasCustomImplementation ? null : DEFAULT_FEATURES.image,
    locale: DEFAULT_FEATURES.locale,
  };
}

function mergeFeatures(
  adapter: z.infer<typeof adapterKeySchema>,
  userFeatures?: Partial<z.infer<typeof frameworkOptionsSchema>>,
) {
  const defaults = getDefaultFeaturesForAdapter(adapter);
  return {
    colorMode: userFeatures?.colorMode ?? defaults.colorMode,
    fonts: userFeatures?.fonts ?? defaults.fonts,
    image: userFeatures?.image ?? defaults.image,
    locale: userFeatures?.locale ?? defaults.locale,
  };
}
