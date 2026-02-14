import tailwindPlugin from "@tailwindcss/vite";
import { createUnplugin, type UnpluginOptions } from "unplugin";

// biome-ignore lint/complexity/noBannedTypes: safe_to_set
export type PluginOptions = {};

export default createUnplugin<PluginOptions | undefined>((_opts = {}) => {
  return [tailwindPlugin()].filter(Boolean).flat(1) as UnpluginOptions[];
});
