import { isString } from "es-toolkit";
import { z } from "zod";

import {
  COMMON_ADAPTERS,
  CUSTOM_ADAPTERS,
  DEFAULT_FEATURES,
} from "../constants";

/* -------------------------------------------------------------------------- */
/* atoms                                                                      */
/* -------------------------------------------------------------------------- */

const triState = z.union([z.boolean(), z.null()]);

/* -------------------------------------------------------------------------- */
/* common                                                                     */
/* -------------------------------------------------------------------------- */

export const colorKeySchema = z.enum([
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
]);

export const iconKeySchema = z.enum(["dark", "light", "system", "user"]);

export const iconsetKeySchema = z.enum([
  "heroicons-outline",
  "heroicons-solid",
  "hugeicons",
  "lucide",
  "phosphor",
  "tabler",
]);

export const neutralKeySchema = z.enum([
  "gray",
  "neutral",
  "slate",
  "stone",
  "zinc",
]);

export const routerKeySchema = z.enum(["inertia", "tanstack"]);

export const sizeKeySchema = z.enum(["xs", "sm", "md", "lg", "xl"]);

export const strategyKeySchema = z.enum(["merge", "join"]);

export const styleKeySchema = z.enum(["lyra", "maia", "mira", "nova", "vega"]);

/* -------------------------------------------------------------------------- */
/* framework                                                                  */
/* -------------------------------------------------------------------------- */

export const adapterKeySchema = z.enum([
  ...COMMON_ADAPTERS,
  ...CUSTOM_ADAPTERS.react,
  ...CUSTOM_ADAPTERS.solid,
  ...CUSTOM_ADAPTERS.svelte,
  ...CUSTOM_ADAPTERS.vue,
] as const);

const platformKeySchema = z.enum(["react", "solid", "svelte", "vue"]);

const frameworkNameSchema = z.custom<
  | `${"react" | "solid" | "svelte" | "vue"}:${(typeof COMMON_ADAPTERS)[number]}`
  | `react:${(typeof CUSTOM_ADAPTERS)["react"][number]}`
  | `solid:${(typeof CUSTOM_ADAPTERS)["solid"][number]}`
  | `svelte:${(typeof CUSTOM_ADAPTERS)["svelte"][number]}`
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
  if ((defaultAdapters as readonly string[]).includes(validAdapter)) {
    return true;
  }

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
  output: z.string().default("generated"),
});

/* -------------------------------------------------------------------------- */
/* css                                                                        */
/* -------------------------------------------------------------------------- */

export const rawCssSchema = z.object({
  strategy: strategyKeySchema.default("merge"),
  prefix: z.string().default(""),
  classGroups: z.looseObject({}).optional(),
});

export const cssSchema = rawCssSchema.extend({
  baseColor: neutralKeySchema.default("zinc"),
  unstyled: z.boolean().default(false),
  variables: z.boolean().default(false),
  entry: z.string().optional(),
  sources: z.array(z.string()).default(["./theme"]),
});

/* -------------------------------------------------------------------------- */
/* theme                                                                      */
/* -------------------------------------------------------------------------- */

const rawIconsSchema = z.looseObject(
  z.record(iconKeySchema, z.string()).optional(),
);

export const iconsetSchema = z.union([
  iconsetKeySchema,
  z.tuple([iconsetKeySchema, rawIconsSchema]),
]);

export const themeSchema = z.object({
  defaultVariants: z.object({
    color: colorKeySchema.default("primary"),
    size: sizeKeySchema.default("md"),
  }),
  colors: z.array(z.string()).optional(),
  iconset: iconsetSchema.default("lucide"),
  style: styleKeySchema.default("vega"),
  transitions: z.boolean().default(true),
});

/* -------------------------------------------------------------------------- */
/* ui                                                                         */
/* -------------------------------------------------------------------------- */

export const presetSchema = z
  .looseObject({ icon: z.looseObject({ dynamic: z.boolean() }).optional() })
  .optional();

const uiSchema = z.object({
  colors: z
    .looseObject({ neutral: neutralKeySchema.default("zinc") })
    .optional(),
  components: presetSchema.optional(),
  css: rawCssSchema.optional(),
  icons: rawIconsSchema.optional(),
});

/* -------------------------------------------------------------------------- */
/* config                                                                     */
/* -------------------------------------------------------------------------- */

export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  framework: frameworkSchema,
  cli: cliSchema.optional(),
  css: cssSchema.optional(),
  preset: presetSchema.optional(),
  theme: themeSchema.optional(),
});

const routerSchema = z.union([triState, routerKeySchema]);

export const configSchema = frameworkOptionsSchema.extend({
  output: z.string().default("generated"),
  prefix: z.string().default("U"),
  css: cssSchema.optional(),
  router: routerSchema.default(false),
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
