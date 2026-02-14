import { getConfig } from "@veehance/core/config";
import {
  resolveColors,
  resolveOptions,
  resolveUI,
} from "@veehance/core/helpers";
import type { Options } from "@veehance/core/types";

import tailwindPlugin from "@tailwindcss/vite";
import { createUnplugin, type UnpluginOptions } from "unplugin";
import fontsPlugin from "vite-plugin-webfont-dl";

import { environmentPlugin } from "./integration/environment";
import { pluginsPlugin } from "./integration/plugins";
import { templatesPlugin } from "./integration/templates";

export interface PluginOptions extends Options {}

export default createUnplugin<PluginOptions | undefined>((_options = {}) => {
  const config = getConfig(process.cwd());
  const options = resolveOptions(config, { dts: false }, _options);

  options.theme ??= {};
  options.theme.colors = resolveColors(options.theme.colors);

  return [
    environmentPlugin(options),
    pluginsPlugin(options),
    templatesPlugin(options, resolveUI(options)),
    options?.fonts && fontsPlugin(),
    tailwindPlugin(),
  ]
    .filter(Boolean)
    .flat(1) as UnpluginOptions[];
});
