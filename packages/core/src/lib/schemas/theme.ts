import { z } from "zod";

import { colorKeys, iconKeys, iconsetKeys, presetKeys, sizeKeys } from "./keys";

export const _iconsetSchema = z.record(
  z.union([iconKeys, z.string()]),
  z.string(),
);

export const iconsetSchema = z.union([
  iconsetKeys,
  z.tuple([iconsetKeys, _iconsetSchema]),
]);

export const _presetSchema = z.looseObject({
  icon: z.looseObject({ dynamic: z.boolean() }).optional(),
});

export const presetSchema = z.union([
  presetKeys,
  z.tuple([presetKeys, _presetSchema]),
]);

const defaultVariantsSchema = z.object({
  color: z.union([colorKeys, z.string()]).optional(),
  size: sizeKeys.optional(),
});

export const themeSchema = z.object({
  colors: z.array(z.string()).optional(),
  defaultVariants: defaultVariantsSchema.optional(),
  iconset: iconsetSchema.optional(),
  preset: presetSchema.optional(),
  transitions: z.boolean().optional(),
});
