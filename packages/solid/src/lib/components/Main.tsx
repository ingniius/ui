import type { ClassValue } from "@veehance/core/types";
import { cx } from "@veehance/core/utils";

import { type Component, splitProps } from "solid-js";

export type MainProps = {
  class?: ClassValue;
};

const Main: Component<MainProps> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return <main data-slot="main" class={cx(props.class)} {...rest} />;
};

export default Main;
