import type { ClassValue } from "@veehance/core/types";
import { cx } from "@veehance/core/utils";

export type MainProps = React.ComponentProps<"main"> & {
  className?: ClassValue;
};

function Main({ className, ...props }: MainProps) {
  return <main data-slot="main" className={cx(className)} {...props} />;
}

export default Main;
