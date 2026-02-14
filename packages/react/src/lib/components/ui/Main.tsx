import type { ClassValue, Component } from "@veehance/core/types";
import { cv } from "@veehance/core/utils";

import theme from "#build/theme/main";
import { useAppConfig } from "#build/ui/imports";

type Main = Component<typeof theme, "main", "ui">;

export type MainProps = React.ComponentProps<"main"> & {
  className?: ClassValue;
};

function Main({ className, ...props }: MainProps) {
  const appConfig = useAppConfig() as Main["config"];

  const ui = cv({
    extend: cv(theme),
    ...(appConfig.ui?.components?.main || {}),
  });

  return (
    <main data-slot="main" className={ui({ className }) as any} {...props} />
  );
}

export default Main;
