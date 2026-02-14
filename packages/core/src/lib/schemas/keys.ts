import { z } from "zod";

import {
  ADAPTER_KEYS,
  COLOR_KEYS,
  ICON_KEYS,
  ICONSET_KEYS,
  NEUTRAL_KEYS,
  PRESET_KEYS,
  ROUTER_KEYS,
  RUNTIME_KEYS,
  SIZE_KEYS,
  STRATEGY_KEYS,
} from "../constants";

export const adapterKeys = z.enum(ADAPTER_KEYS);

export const baseColorKeys = z.enum(NEUTRAL_KEYS);

export const colorKeys = z.enum(COLOR_KEYS);

export const iconKeys = z.enum(ICON_KEYS);

export const iconsetKeys = z.enum(ICONSET_KEYS);

export const presetKeys = z.enum(PRESET_KEYS);

export const routerKeys = z.enum(ROUTER_KEYS);

export const runtimeKeys = z.enum(RUNTIME_KEYS);

export const sizeKeys = z.enum(SIZE_KEYS);

export const strategyKeys = z.enum(STRATEGY_KEYS);
