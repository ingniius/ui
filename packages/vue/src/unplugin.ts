import tailwindPlugin from "@tailwindcss/vite";
import { createUnplugin, type UnpluginOptions } from "unplugin";

export type PluginOptions = {
  prefix?: string;
};

export default createUnplugin<PluginOptions | undefined>(
  (_options = {}, _meta) => {
    return [tailwindPlugin()].filter(Boolean).flat(1) as UnpluginOptions[];
  },
);
