import { getConfig } from "@veehance/core/config";
import {
  resolveColors,
  resolveOptions,
  resolveUI,
} from "@veehance/core/helpers";
import type { Options } from "@veehance/core/types";

import tailwindPlugin from "@tailwindcss/vite";
import { defu } from "defu";
import { createUnplugin, type UnpluginOptions } from "unplugin";
import fontsPlugin from "vite-plugin-webfont-dl";

import { environmentPlugin } from "./integration/environment";
import { templatesPlugin } from "./integration/templates";

export interface PluginOptions extends Options {}

export default createUnplugin<PluginOptions | undefined>((_options = {}) => {
  const config = getConfig(process.cwd());
  const options = resolveOptions(config, { dts: false }, _options);

  options.theme ??= {};
  options.theme.colors = resolveColors(options.theme.colors);

  const appConfig = defu(
    { colorMode: options.colorMode, ui: options.ui },
    { ui: resolveUI(options) },
  );

  return [
    environmentPlugin(options),
    templatesPlugin(options, appConfig.ui),
    options?.fonts && fontsPlugin(),
    tailwindPlugin(),
  ]
    .filter(Boolean)
    .flat(1) as UnpluginOptions[];
});
