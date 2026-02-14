import type { ClassValue, Stringify, Token } from "@veehance/core/types";
import { cx, iconToSVG } from "@veehance/core/utils";

import { Icon as IconifyIcon } from "@iconify/react";
import { isString } from "radash";
import { useMemo } from "react";

import { useAppConfig, useIcon } from "#build/ui/imports";

export type IconProps = {
  name?: Stringify<Token["icon"]>;
  icon?: Stringify<Token["icon"]>;
  dynamic?: boolean;
  className?: ClassValue;
};

function Icon({ className, name, icon, dynamic, ...props }: IconProps) {
  const appConfig = useAppConfig();

  const _icon = useIcon(name, icon);
  const isDynamic = dynamic ?? appConfig.ui.components?.icon?.dynamic;
  const shouldRenderSVG = !isDynamic && isString(_icon);

  const svg = useMemo(() => {
    if (!shouldRenderSVG) return null;
    return iconToSVG(_icon);
  }, [shouldRenderSVG, _icon]);

  if (isDynamic)
    return <IconifyIcon icon={_icon} className={cx(className)} {...props} />;

  if (shouldRenderSVG && svg) {
    return (
      <svg
        {...svg.attributes}
        {...props}
        className={cx(className)}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: safe_to_set
        dangerouslySetInnerHTML={{ __html: svg.body }}
      />
    );
  }
}

export default Icon;
