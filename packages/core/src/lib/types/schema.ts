import type { z } from "zod";

import type {
  colorKeySchema,
  iconKeySchema,
  iconsetKeySchema,
  neutralKeySchema,
  routerKeySchema,
  sizeKeySchema,
  strategyKeySchema,
  styleKeySchema,
} from "../schemas";

export type ColorKey = z.infer<typeof colorKeySchema>;

export type IconKey = z.infer<typeof iconKeySchema>;

export type IconsetKey = z.infer<typeof iconsetKeySchema>;

export type NeutralKey = z.infer<typeof neutralKeySchema>;

export type RouterKey = z.infer<typeof routerKeySchema>;

export type StrategyKey = z.infer<typeof strategyKeySchema>;

export type SizeKey = z.infer<typeof sizeKeySchema>;

export type StyleKey = z.infer<typeof styleKeySchema>;
