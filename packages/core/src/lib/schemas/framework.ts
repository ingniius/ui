import { isString } from "radash";
import { z } from "zod";

import { COMMON_ADAPTERS, CUSTOM_ADAPTERS } from "../constants";
import { defaults } from "../defaults";
import { adapterKeys, runtimeKeys } from "./keys";

const frameworkNameSchema = z.custom<
  | `${"react" | "vue"}:${(typeof COMMON_ADAPTERS)[number]}`
  | `react:${(typeof CUSTOM_ADAPTERS)["react"][number]}`
  | `vue:${(typeof CUSTOM_ADAPTERS)["vue"][number]}`
>((value) => {
  if (!isString(value) || !value.includes(":")) return false;
  const [runtime, adapter] = value.split(":") as [string, string];

  const runtimeResult = runtimeKeys.safeParse(runtime);
  if (!runtimeResult.success) return false;
  const validPlatform = runtimeResult.data;

  const adapterResult = adapterKeys.safeParse(adapter);
  if (!adapterResult.success) return false;
  const validAdapter = adapterResult.data;

  const defaultAdapters = COMMON_ADAPTERS;
  if ((defaultAdapters as readonly string[]).includes(validAdapter))
    return true;

  const customAdapters = CUSTOM_ADAPTERS[validPlatform];
  if (!customAdapters) return false;
  return (customAdapters as readonly string[]).includes(validAdapter);
});

export const featuresSchema = z.object({
  colorMode: z.boolean().optional(),
  fonts: z.boolean().optional().optional(),
  icon: z.boolean().optional().optional(),
  image: z.boolean().optional().optional(),
  locale: z.boolean().optional(),
  mdc: z.boolean().optional(),
});

export const _frameworkSchema = z.object({
  runtime: runtimeKeys,
  adapter: adapterKeys,
  features: featuresSchema,
});

export const frameworkSchema = z
  .union([
    frameworkNameSchema,
    z.tuple([frameworkNameSchema, featuresSchema.partial()]),
  ])
  .transform((value): z.infer<typeof _frameworkSchema> => {
    const [name, userFeatures] = isString(value) ? [value, undefined] : value;
    const [runtime, adapter] = name.split(":") as [
      z.infer<typeof runtimeKeys>,
      z.infer<typeof adapterKeys>,
    ];

    return {
      runtime,
      adapter,
      features: mergeFeatures(adapter, userFeatures),
    };
  })
  .pipe(_frameworkSchema);

function getDefaultOptionsForAdapter(_adapter: z.infer<typeof adapterKeys>) {
  return {
    colorMode: defaults.colorMode,
    fonts: defaults.fonts,
    icon: defaults.icon,
    image: defaults.image,
    locale: defaults.locale,
    mdc: defaults.mdc,
  };
}

function mergeFeatures(
  adapter: z.infer<typeof adapterKeys>,
  userFeatures?: Partial<z.infer<typeof featuresSchema>>,
) {
  const options = getDefaultOptionsForAdapter(adapter);
  return {
    colorMode: userFeatures?.colorMode ?? options.colorMode,
    fonts: userFeatures?.fonts ?? options.fonts,
    icon: userFeatures?.icon ?? options.icon,
    image: userFeatures?.image ?? options.image,
    locale: userFeatures?.locale ?? options.locale,
    mdc: userFeatures?.mdc ?? options.mdc,
  };
}
