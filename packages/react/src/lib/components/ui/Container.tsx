import type { ClassValue, Component } from "@veehance/core/types";
import { cv } from "@veehance/core/utils";

import theme from "#build/theme/container";
import { useAppConfig } from "#build/ui/imports";

type Container = Component<typeof theme, "container", "ui">;

export type ContainerProps = React.ComponentProps<"div"> & {
  className?: ClassValue;
};

function Container({ className, ...props }: ContainerProps) {
  const appConfig = useAppConfig() as Container["config"];

  const ui = cv({
    extend: cv(theme),
    ...(appConfig.ui?.components?.container || {}),
  });

  return (
    <div
      data-slot="container"
      className={ui({ className }) as any}
      {...props}
    />
  );
}

export default Container;
