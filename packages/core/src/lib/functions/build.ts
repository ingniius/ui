import type { Dict, Options } from "../types";

export function generateAppConfig(ui: Dict<string, Dict>, options: Options) {
  return `export default ${JSON.stringify({ colorMode: options.colorMode, ui }, null, 2)}\n`;
}

export function generateAppConfigUI(ui: Dict<string, Dict>, options: Options) {
  const colorUnion = options.theme?.colors?.length
    ? options.theme.colors.map((c) => JSON.stringify(c)).join(" | ")
    : "string";

  const iconKeys = Object.keys(ui?.icons || {});
  const iconUnion = iconKeys.length
    ? iconKeys.map((i) => JSON.stringify(i)).join(" | ")
    : "string";

  const template = `import type { UI } from '@veehance/core/types'

import type * as ui from '#build/theme/index'

interface AppConfigUI {
  ui?: UI<
    typeof ui,
    ${colorUnion},
    ${iconUnion}
  >
}\n`;

  return template;
}
