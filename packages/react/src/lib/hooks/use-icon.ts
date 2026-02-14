import type { Stringify, Token } from "@veehance/core/types";

import appConfig from "#build/app.config";

export const useIcon = <T extends Token["icon"] = Token["icon"]>(
  name?: Stringify<T>,
  icon?: Stringify<T>,
) => {
  const iconify = icon ?? name;
  if (iconify?.includes(":")) return iconify;
  return appConfig.ui.icons![iconify as T] || appConfig.ui.icons?.alert;
};
