import type { ClassValue } from "@veehance/core/types";
import { cx } from "@veehance/core/utils";

import { type Component, splitProps } from "solid-js";

export type ContainerProps = {
  class?: ClassValue;
};

const Container: Component<ContainerProps> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return <div data-slot="container" class={cx(props.class)} {...rest} />;
};

export default Container;
