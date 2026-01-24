import type { ClassValue } from "@veehance/core/types";
import { cx } from "@veehance/core/utils";

export type ContainerProps = React.ComponentProps<"div"> & {
  className?: ClassValue;
};

function Container({ className, ...props }: ContainerProps) {
  return <div data-slot="container" className={cx(className)} {...props} />;
}

export default Container;
